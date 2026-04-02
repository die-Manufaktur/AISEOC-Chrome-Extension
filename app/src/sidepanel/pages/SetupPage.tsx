import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { getKeywordForUrl, getAdvancedOptions } from "@/lib/storage";
import { Settings, X } from "lucide-react";

const pageTypes = [
  { value: "homepage", label: "Homepage" },
  { value: "category-page", label: "Category Page" },
  { value: "product-page", label: "Product Page" },
  { value: "product-software", label: "Product Software" },
  { value: "blog-post", label: "Blog Post" },
  { value: "landing-page", label: "Landing Page" },
  { value: "contact-page", label: "Contact Page" },
  { value: "about-page", label: "About Page" },
  { value: "service-page", label: "Service Page" },
  { value: "portfolio-page", label: "Portfolio Page" },
  { value: "testimonial-page", label: "Testimonial Page" },
  { value: "location-page", label: "Location Page" },
  { value: "legal-page", label: "Legal Page" },
  { value: "event-page", label: "Event Page" },
  { value: "press-page", label: "Press/News Page" },
  { value: "job-page", label: "Job/Career Page" },
];

const languages = SUPPORTED_LANGUAGES.map((lang) => ({
  value: lang.code,
  label: `${lang.code.toUpperCase()} - ${lang.name}`,
}));

interface SetupPageProps {
  onAnalyze: () => void;
}

const isDevMode =
  typeof chrome === "undefined" || chrome.tabs === undefined;

/**
 * Hook that watches an input element for programmatic value changes
 * (autofill, paste tools, browser automation) and syncs back to React state.
 *
 * Programmatic fill tools often set the native `value` property directly and
 * dispatch an `input` event without clearing the field first.  Because React
 * controlled inputs continuously write state back to the DOM, the dispatched
 * event's `target.value` ends up being the *old* React state concatenated
 * with the new text.
 *
 * This hook intercepts the native `value` setter so that any external write
 * is immediately forwarded to the provided `onValueChange` callback, keeping
 * React state in sync and preventing duplication.
 */
function useProgrammaticInputSync(
  onValueChange: (value: string) => void,
) {
  const ref = useRef<HTMLInputElement>(null);
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    // Get the native value setter from the HTMLInputElement prototype.
    const nativeDescriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    );
    if (!nativeDescriptor || !nativeDescriptor.set) return;

    const nativeSetter = nativeDescriptor.set;

    // Replace the value setter on this specific element instance.
    // When a programmatic tool sets `input.value = "..."`, this fires
    // our callback so React state stays in sync before any subsequent
    // input events are dispatched.
    Object.defineProperty(input, "value", {
      configurable: true,
      get() {
        return nativeDescriptor.get?.call(this) ?? "";
      },
      set(newValue: string) {
        // Call the original native setter first to actually update the DOM.
        nativeSetter.call(this, newValue);
        // Sync value back to React state.
        onValueChangeRef.current(newValue);
      },
    });

    return () => {
      // Restore original behaviour by removing the instance override.
      delete (input as unknown as Record<string, unknown>).value;
    };
  }, []);

  return ref;
}

export function SetupPage({ onAnalyze }: SetupPageProps) {
  const { settings, setSettings, apiKey, setApiKey, error } = useStore();
  const [showSettings, setShowSettings] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleSaveSettings = async () => {
    await setApiKey(localApiKey);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const keywordRef = useProgrammaticInputSync((value) =>
    setSettings({ keyword: value }),
  );

  const urlRef = useProgrammaticInputSync((value) =>
    setSettings({ targetUrl: value }),
  );

  const handleUrlBlur = useCallback(async () => {
    const url = settings.targetUrl.trim();
    if (!url) return;
    try {
      const savedKeyword = await getKeywordForUrl(url);
      if (savedKeyword && !settings.keyword) {
        setSettings({ keyword: savedKeyword });
      }
      const host = new URL(url).hostname;
      const savedOptions = await getAdvancedOptions(host);
      if (savedOptions) {
        setSettings({
          pageType: savedOptions.pageType,
          secondaryKeywords: savedOptions.secondaryKeywords,
          language: savedOptions.language,
          advancedMode: true,
        });
      }
    } catch {
      // Invalid URL — ignore
    }
  }, [settings.targetUrl, settings.keyword, setSettings]);

  const canAnalyze =
    settings.keyword.trim() !== "" &&
    (!isDevMode || settings.targetUrl.trim() !== "");

  const secondaryKeywordsLength = settings.secondaryKeywords.length;

  return (
    <div className="flex min-h-screen flex-col items-center bg-bg-900 p-3">
      {/* Main card */}
      <div className="flex w-full flex-col gap-10 rounded-[20px] border-2 border-[#5b5959] bg-bg-700 px-5 py-8">
        <div className="flex flex-col gap-6">
          {/* Title with settings gear */}
          <div className="relative flex items-center justify-center">
            <h1 className="text-center text-[28px] font-medium leading-[1.1] text-text-primary">
              Set up your SEO analysis
            </h1>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="absolute right-0 rounded-full p-1.5 text-text-secondary transition-colors hover:bg-bg-500 hover:text-text-primary"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Inline settings panel */}
          {showSettings && (
            <div className="flex flex-col gap-4 rounded-[14px] border border-[#717171] bg-bg-500 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-semibold text-text-primary">Settings</span>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="rounded-full p-1 text-text-secondary transition-colors hover:bg-bg-700 hover:text-text-primary"
                  aria-label="Close settings"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="settings-api-key" className="text-[16px] font-medium text-text-primary">
                  OpenAI API key
                </label>
                <input
                  id="settings-api-key"
                  type="password"
                  placeholder="sk-..."
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  className="w-full rounded-[10px] border border-[#717171] bg-bg-700 p-[10px] text-[16px] text-text-primary placeholder:text-text-secondary outline-none focus:ring-1 focus:ring-accent-blue transition-shadow"
                />
              </div>

              <Select
                label="AI recommendations language"
                options={languages}
                value={settings.language}
                onChange={(e) => setSettings({ language: e.target.value })}
              />

              <button
                type="button"
                onClick={handleSaveSettings}
                className="self-start rounded-full bg-accent-blue px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-accent-blue/90"
              >
                Save
              </button>

              {settingsSaved && (
                <p className="text-[14px] text-green-400">Settings saved.</p>
              )}
            </div>
          )}

          {/* Dev mode URL field */}
          {isDevMode && (
            <Input
              ref={urlRef}
              label="Page URL to analyze"
              type="url"
              placeholder="https://example.com"
              value={settings.targetUrl}
              onChange={(e) => setSettings({ targetUrl: e.target.value })}
              onBlur={handleUrlBlur}
            />
          )}

          {/* Main keyword */}
          <Input
            ref={keywordRef}
            label="Main keyword"
            placeholder="Enter your main keyword"
            value={settings.keyword}
            onChange={(e) => setSettings({ keyword: e.target.value })}
          />

          {/* Divider */}
          <div className="h-px w-full bg-bg-500" />

          {/* Advanced Analysis section */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <span className="text-[20px] font-semibold leading-[1.2] text-text-primary">
                Advanced Analysis
              </span>
              <span className="text-[12px] text-text-primary">optional</span>
            </div>
            <div className="flex items-start justify-between">
              <p className="text-[18px] leading-[1.3] text-text-secondary" style={{ maxWidth: 458 }}>
                Get smarter, page-specific recommendations based on your page context.
              </p>
              <Toggle
                checked={settings.advancedMode}
                onChange={(checked) => setSettings({ advancedMode: checked })}
              />
            </div>
          </div>

          {/* Advanced fields */}
          {settings.advancedMode && (
            <>
              <Select
                label="Page type"
                options={pageTypes}
                value={settings.pageType}
                onChange={(e) => setSettings({ pageType: e.target.value })}
              />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[20px] font-semibold leading-[1.2] text-text-primary">
                    Secondary keywords
                  </span>
                  <span className="text-[12px] text-text-primary">
                    ({secondaryKeywordsLength}/2000 characters)
                  </span>
                </div>
                <textarea
                  id="secondary-keywords"
                  placeholder="SEO Webflow, Search engine optimization..."
                  value={settings.secondaryKeywords}
                  onChange={(e) => {
                    if (e.target.value.length <= 2000) {
                      setSettings({ secondaryKeywords: e.target.value });
                    }
                  }}
                  rows={3}
                  className="w-full rounded-[10px] border border-[#717171] bg-bg-500 p-[14px] text-[18px] leading-[1.3] text-text-primary shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] placeholder:text-text-secondary outline-none focus:ring-1 focus:ring-accent-blue transition-shadow resize-none"
                />
                <p className="text-[18px] leading-[1.3] text-text-secondary">
                  Add related or synonym keywords to help AI deliver richer SEO recommendations.
                </p>
              </div>

            </>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="rounded-[10px] border border-red/30 bg-red/10 px-4 py-3 text-[16px] text-red">
            {error}
          </div>
        )}

        {/* Button — centered pill, not full-width */}
        <div className="flex justify-center">
          <Button
            onClick={onAnalyze}
            disabled={!canAnalyze}
          >
            Optimize my SEO
          </Button>
        </div>
      </div>

      {/* Footer — pinned to bottom */}
      <div className="mt-auto w-full pt-3">
        <Footer />
      </div>
    </div>
  );
}
