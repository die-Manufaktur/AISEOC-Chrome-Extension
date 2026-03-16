import { useCallback } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { getKeywordForUrl, getAdvancedOptions } from "@/lib/storage";

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
  const { settings, setSettings, error } = useStore();

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
          {/* Title */}
          <h1 className="text-center text-[28px] font-medium leading-[1.1] text-text-primary">
            Set up your SEO analysis
          </h1>

          {/* Dev mode URL field */}
          {isDevMode && (
            <Input
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

              <Select
                label="AI recommendations language"
                options={languages}
                value={settings.language}
                onChange={(e) => setSettings({ language: e.target.value })}
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
