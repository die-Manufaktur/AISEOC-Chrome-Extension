import { useEffect, useCallback } from "react";
import { useStore } from "@/lib/store";
import { runSEOChecks } from "@/lib/seo-analyzer";
import { calculateAnalysis } from "@/lib/scoring";
import { fetchAndAnalyzePage } from "@/lib/fetch-page";
import { detectLanguage } from "@/lib/languages";
import { generateRecommendation, generateAllH2Suggestions } from "@/lib/openai";
import {
  saveKeywordForUrl,
  getKeywordForUrl,
  saveAdvancedOptions,
  getAdvancedOptions,
} from "@/lib/storage";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Onboarding } from "@/components/Onboarding";
import { Toast } from "@/components/ui/Toast";
import { SetupPage } from "./pages/SetupPage";
import { LoadingPage } from "./pages/LoadingPage";
import { ScorePage } from "./pages/ScorePage";
import { SubscoresPage } from "./pages/SubscoresPage";
import type { PageSEOData, SEOCheck, SEOAnalysis } from "@/types/seo";

const isDevMode =
  typeof chrome === "undefined" || chrome.tabs === undefined;

/** Auto-generate AI recommendations for failing copyable checks and H2 suggestions. */
async function generateAIRecommendations(
  analysis: SEOAnalysis,
  apiKey: string,
  keyword: string,
  advancedOptions?: { pageType?: string; secondaryKeywords?: string; languageCode?: string },
): Promise<string | null> {
  const allChecks = analysis.categories.flatMap((c) => c.checks);
  const promises: Promise<void>[] = [];
  for (const check of allChecks) {
    if (check.status === "pass") continue;

    // Auto-generate H2 suggestions
    if (check.id === "h2-keyword" && check.h2Recommendations?.length) {
      promises.push(
        generateAllH2Suggestions(
          apiKey,
          check.h2Recommendations.map((h) => h.text),
          keyword,
          advancedOptions,
        ).then((suggestions) => {
          check.h2Recommendations!.forEach((h, i) => {
            h.suggestion = suggestions[i] ?? "";
          });
        }),
      );
      continue;
    }

    // Auto-generate text recommendations for copyable checks
    if (check.copyable) {
      const context = getCheckContext(check, analysis);
      promises.push(
        generateRecommendation(apiKey, check.id, keyword, context, advancedOptions)
          .then((rec) => { check.recommendation = rec; }),
      );
    }
  }

  if (promises.length === 0) return null;

  const settled = await Promise.allSettled(promises);
  const failures = settled.filter((r) => r.status === "rejected");

  if (failures.length === 0) return null;

  // Determine error type from the first failure
  const firstError = (failures[0] as PromiseRejectedResult).reason;
  const errorMsg = firstError?.message ?? String(firstError);

  if (errorMsg.includes("401") || errorMsg.includes("Incorrect API key") || errorMsg.includes("invalid_api_key")) {
    return "Invalid OpenAI API key — AI suggestions could not be generated.";
  }
  if (errorMsg.includes("429") || errorMsg.includes("rate_limit")) {
    return "OpenAI rate limit reached — some AI suggestions were skipped.";
  }
  if (errorMsg.includes("insufficient_quota") || errorMsg.includes("billing")) {
    return "OpenAI quota exceeded — check your billing at platform.openai.com.";
  }

  if (failures.length === settled.length) {
    return `AI suggestions failed: ${errorMsg}`;
  }

  return `${failures.length} of ${settled.length} AI suggestions failed to generate.`;
}

function getCheckContext(check: SEOCheck, analysis: SEOAnalysis): string {
  switch (check.id) {
    case "title-keyword": return analysis.pageData.title;
    case "meta-description-keyword": return analysis.pageData.metaDescription;
    case "keyword-url": return analysis.pageData.url;
    case "h1-keyword": return analysis.pageData.h1[0] ?? "";
    case "keyword-intro": return analysis.pageData.paragraphs[0] ?? "";
    default: return check.details ?? "";
  }
}

/** Extract SEO data from the active tab.
 *  Tries the content script first; if unavailable, fetches the page HTML
 *  directly and parses it (works even when content script isn't injected). */
async function extractPageData(tabId: number): Promise<PageSEOData> {
  // Try content script message first (fastest, reads live DOM)
  const response = await new Promise<{ data?: PageSEOData; error?: string }>((resolve) => {
    const timer = setTimeout(() => resolve({ error: "timeout" }), 3000);
    chrome.tabs.sendMessage(tabId, { type: "EXTRACT_SEO_DATA" }, (resp) => {
      clearTimeout(timer);
      if (chrome.runtime.lastError) {
        resolve({ error: chrome.runtime.lastError.message });
      } else {
        resolve(resp ?? { error: "No response" });
      }
    });
  });

  if (response.data) return response.data;

  // Fallback: ask the service worker to extract the data. It will try the
  // content script first, then fall back to executeScript (which works
  // reliably from the service worker context, unlike from the side panel).
  console.warn("[AI SEO Copilot] Content script not available, using service worker extraction");
  const swResponse = await new Promise<{ data?: PageSEOData; error?: string }>((resolve) => {
    const timer = setTimeout(() => resolve({ error: "Page extraction timed out. Please refresh the page and try again." }), 15000);
    chrome.runtime.sendMessage(
      { type: "EXTRACT_PAGE_DATA", tabId },
      (resp) => {
        clearTimeout(timer);
        if (chrome.runtime.lastError) {
          resolve({ error: chrome.runtime.lastError.message });
        } else if (resp?.error) {
          resolve({ error: resp.error });
        } else if (resp?.data) {
          resolve({ data: resp.data as PageSEOData });
        } else {
          resolve({ error: "No data returned" });
        }
      },
    );
  });

  if (swResponse.data) return swResponse.data;

  throw new Error(swResponse.error ?? "Failed to extract page data");
}

export default function App() {
  const { view, setView, setAnalysis, setError, settings, setSettings, loadApiKey, hideToast, toast, reset } =
    useStore();

  useEffect(() => {
    loadApiKey();
  }, [loadApiKey]);

  // Register this tab with the service worker for per-tab panel scoping
  useEffect(() => {
    if (isDevMode) return;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.runtime.sendMessage({ type: "PANEL_OPENED", tabId: tabs[0].id });
      }
    });
  }, []);

  // Load saved keyword/settings for a given URL
  const loadSettingsForUrl = useCallback(
    async (url: string) => {
      try {
        const savedKeyword = await getKeywordForUrl(url);
        const host = new URL(url).hostname;
        const savedOptions = await getAdvancedOptions(host);
        if (savedKeyword) setSettings({ keyword: savedKeyword });
        if (savedOptions) {
          setSettings({
            pageType: savedOptions.pageType,
            secondaryKeywords: savedOptions.secondaryKeywords,
            language: savedOptions.language,
            advancedMode: true,
          });
        }
      } catch {
        // Invalid URL
      }
    },
    [setSettings],
  );

  // Auto-detect URL and load saved keyword/settings on mount
  useEffect(() => {
    async function loadSavedSettings() {
      if (!isDevMode) {
        try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab?.url) {
            await loadSettingsForUrl(tab.url);
          }
        } catch {
          // Not in extension context
        }
      } else {
        const { settings } = useStore.getState();
        if (settings.targetUrl.trim()) {
          await loadSettingsForUrl(settings.targetUrl);
        }
      }
    }
    loadSavedSettings();
  }, [setSettings, loadSettingsForUrl]);

  // Listen for same-tab navigation — reset to setup page when URL changes
  useEffect(() => {
    if (isDevMode) return;

    let currentUrl = "";

    // Get the initial URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) currentUrl = tabs[0].url;
    });

    // When the active tab navigates to a new URL
    const handleTabUpdated = (
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
    ) => {
      // Only care about completed navigations with a URL change
      if (changeInfo.status !== "complete") return;

      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (tabs[0]?.id === tabId && tabs[0].url && tabs[0].url !== currentUrl) {
          currentUrl = tabs[0].url;
          reset();
          await loadSettingsForUrl(currentUrl);
        }
      });
    };

    // When the user switches to a different tab
    const handleTabActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
      chrome.tabs.get(activeInfo.tabId, async (tab) => {
        if (chrome.runtime.lastError) return;
        if (tab.url && tab.url !== currentUrl) {
          currentUrl = tab.url;
          reset();
          await loadSettingsForUrl(currentUrl);
        }
      });
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdated);
    chrome.tabs.onActivated.addListener(handleTabActivated);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
      chrome.tabs.onActivated.removeListener(handleTabActivated);
    };
  }, [reset, loadSettingsForUrl]);

  const handleAnalyze = useCallback(async () => {
    setView("loading");
    setError(null);

    try {
      let pageData: PageSEOData;

      if (!isDevMode) {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab?.id) throw new Error("No active tab found");

        pageData = await extractPageData(tab.id);
      } else {
        if (!settings.targetUrl.trim()) {
          throw new Error("Please enter a URL to analyze");
        }
        pageData = await fetchAndAnalyzePage(settings.targetUrl);
      }

      // Auto-detect language on first visit
      if (!settings.advancedMode && pageData.lang) {
        const detected = detectLanguage(pageData.lang);
        if (detected !== "en") {
          setSettings({ language: detected });
        }
      }

      const checks = runSEOChecks(pageData, {
        keyword: settings.keyword,
        secondaryKeywords: settings.secondaryKeywords,
        pageType: settings.pageType,
      });
      const analysis = calculateAnalysis(checks, pageData, settings.keyword);

      setAnalysis(analysis);

      // Auto-generate AI recommendations in background (non-blocking)
      const { apiKey } = useStore.getState();
      if (apiKey) {
        const advancedOptions = settings.advancedMode
          ? {
              pageType: settings.pageType,
              secondaryKeywords: settings.secondaryKeywords,
              languageCode: settings.language,
            }
          : undefined;

        generateAIRecommendations(
          analysis,
          apiKey,
          settings.keyword,
          advancedOptions,
        ).then((aiError) => {
          const store = useStore.getState();
          // Re-set analysis to trigger re-render with populated recommendations
          store.setAnalysis({ ...analysis });
          if (aiError) store.showToast(aiError);
        }).catch((err) => {
          useStore.getState().showToast(`AI error: ${err?.message ?? err}`);
        });
      }

      // Save keyword and settings for this URL
      try {
        await saveKeywordForUrl(pageData.url, settings.keyword);
        if (settings.advancedMode) {
          const host = new URL(pageData.url).hostname;
          await saveAdvancedOptions(host, {
            pageType: settings.pageType,
            secondaryKeywords: settings.secondaryKeywords,
            language: settings.language,
          });
        }
      } catch {
        // Storage save failure is non-critical
      }

      // Highlight issues on page (extension only)
      if (!isDevMode) {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tab?.id) {
          chrome.tabs.sendMessage(tab.id, { type: "HIGHLIGHT_ISSUES" });
        }
      }

      setView("score");
    } catch (error) {
      console.error("[AI SEO Copilot] Analysis failed:", error);
      setError(
        error instanceof Error ? error.message : "Analysis failed",
      );
      setView("setup");
    }
  }, [settings, setView, setAnalysis, setError, setSettings]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg-900">
        <Onboarding />
        {view === "setup" && <SetupPage onAnalyze={handleAnalyze} />}
        {view === "loading" && <LoadingPage />}
        {view === "score" && <ScorePage />}
        {view === "subscores" && <SubscoresPage />}
        <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
      </div>
    </ErrorBoundary>
  );
}
