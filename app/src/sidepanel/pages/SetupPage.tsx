import { useCallback } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { getKeywordForUrl, getAdvancedOptions } from "@/lib/storage";
import { Settings } from "lucide-react";

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

export function SetupPage({ onAnalyze }: SetupPageProps) {
  const { settings, setSettings, apiKey, setApiKey } = useStore();

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

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-h2 text-text-primary">AI SEO Copilot</h1>
            <p className="text-body-12 text-text-secondary">
              {isDevMode
                ? "Dev mode \u2014 enter a URL to analyze"
                : "Analyze and optimize your page SEO"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {isDevMode && (
            <Input
              label="Page URL to Analyze"
              type="url"
              placeholder="https://example.com"
              value={settings.targetUrl}
              onChange={(e) => setSettings({ targetUrl: e.target.value })}
              onBlur={handleUrlBlur}
            />
          )}

          <Input
            label="OpenAI API Key (optional)"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />

          <Input
            label="Target Keyword"
            placeholder="Enter your main keyword..."
            value={settings.keyword}
            onChange={(e) => setSettings({ keyword: e.target.value })}
          />

          <Toggle
            label="Advanced Analysis"
            checked={settings.advancedMode}
            onChange={(checked) => setSettings({ advancedMode: checked })}
          />

          {settings.advancedMode && (
            <div className="flex flex-col gap-4 rounded-card bg-bg-700 p-4">
              <Select
                label="Page Type"
                options={pageTypes}
                value={settings.pageType}
                onChange={(e) => setSettings({ pageType: e.target.value })}
              />

              <Select
                label="Language"
                options={languages}
                value={settings.language}
                onChange={(e) => setSettings({ language: e.target.value })}
              />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="secondary-keywords"
                  className="text-body-12 uppercase tracking-wider text-text-secondary"
                >
                  Secondary Keywords
                </label>
                <textarea
                  id="secondary-keywords"
                  placeholder="Enter secondary keywords, one per line..."
                  value={settings.secondaryKeywords}
                  onChange={(e) =>
                    setSettings({ secondaryKeywords: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-input bg-bg-500 px-4 py-3 text-body-16 text-text-primary placeholder:text-bg-300 outline-none focus:ring-1 focus:ring-accent-blue transition-shadow resize-none"
                />
              </div>
            </div>
          )}

          <Button
            showArrow
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className="mt-2 w-full"
          >
            Optimize my SEO
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
