import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { CheckItem } from "@/components/CheckItem";
import { EditableRecommendation } from "@/components/EditableRecommendation";
import { H2SelectionList } from "@/components/H2SelectionList";
import { ImageAltTextList } from "@/components/ImageAltTextList";
import { SchemaDisplay } from "@/components/SchemaDisplay";
import { Toast } from "@/components/ui/Toast";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import {
  generateRecommendation,
  generateH2Suggestion,
  generateAllH2Suggestions,
  generateAltText,
} from "@/lib/openai";
import { getSchemaRecommendations } from "@/lib/schema-recommendations";
import type { SEOCheck } from "@/types/seo";

const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };

function sortByPriority(checks: SEOCheck[]): SEOCheck[] {
  return [...checks].sort((a, b) => {
    // Failed checks first, passed checks last
    const aPass = a.status === "pass" ? 1 : 0;
    const bPass = b.status === "pass" ? 1 : 0;
    if (aPass !== bPass) return aPass - bPass;
    // Within same pass/fail group, sort by priority: high → medium → low
    return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
  });
}

export function SubscoresPage() {
  const { analysis, activeCategory, setActiveCategory, apiKey, settings, toast, showToast, hideToast } =
    useStore();

  const onToast = useCallback((message: string) => showToast(message), [showToast]);

  if (!analysis || !activeCategory) return null;

  const category = analysis.categories.find(
    (c) => c.category === activeCategory,
  );
  if (!category) return null;

  const failed = category.total - category.passed;
  const keyword = analysis.keyword;
  const sortedChecks = sortByPriority(category.checks);

  const advancedOptions = settings.advancedMode
    ? {
        pageType: settings.pageType,
        secondaryKeywords: settings.secondaryKeywords,
        languageCode: settings.language,
      }
    : undefined;

  const renderCheckRecommendation = (check: SEOCheck) => {
    if (check.status === "pass" || !apiKey) return null;

    // H2 keyword check — show H2 selection list
    if (check.id === "h2-keyword" && check.h2Recommendations) {
      return (
        <div className="mt-3">
          <H2SelectionList
            items={check.h2Recommendations}
            onRegenerateOne={(_index, h2Text) =>
              generateH2Suggestion(apiKey, h2Text, keyword, advancedOptions)
            }
            onRegenerateAll={() =>
              generateAllH2Suggestions(
                apiKey,
                check.h2Recommendations!.map((h) => h.text),
                keyword,
                advancedOptions,
              )
            }
            onToast={onToast}
          />
        </div>
      );
    }

    // Image alt check — show image list
    if (check.id === "images-alt" && check.imageData && check.imageData.length > 0) {
      return (
        <div className="mt-3">
          <ImageAltTextList
            images={check.imageData}
            onGenerate={(src) => generateAltText(apiKey, src, keyword, advancedOptions)}
            onToast={onToast}
          />
        </div>
      );
    }

    // Schema markup check — show schema recommendations
    if (check.id === "schema-markup") {
      const schemas = getSchemaRecommendations(settings.pageType);
      if (schemas.length > 0) {
        return (
          <div className="mt-3">
            <SchemaDisplay schemas={schemas} onToast={onToast} />
          </div>
        );
      }
    }

    // Copyable checks get editable recommendation
    if (check.copyable) {
      const context =
        check.id === "title-keyword"
          ? analysis.pageData.title
          : check.id === "meta-description-keyword"
            ? analysis.pageData.metaDescription
            : check.id === "keyword-url"
              ? analysis.pageData.url
              : check.id === "h1-keyword"
                ? analysis.pageData.h1[0] ?? ""
                : check.id === "keyword-intro"
                  ? analysis.pageData.paragraphs[0] ?? ""
                  : check.details ?? "";

      const label =
        check.id === "title-keyword"
          ? "AI Suggested Title"
          : check.id === "meta-description-keyword"
            ? "AI Suggested Meta Description"
            : check.id === "keyword-url"
              ? "AI Suggested URL Slug"
              : check.id === "h1-keyword"
                ? "AI Suggested H1"
                : check.id === "keyword-intro"
                  ? "AI Suggested Introduction"
                  : "AI Recommendation";

      return (
        <div className="mt-3">
          <EditableRecommendation
            label={label}
            initialValue={check.recommendation ?? "Click regenerate to generate..."}
            onRegenerate={() =>
              generateRecommendation(apiKey, check.id, keyword, context, advancedOptions)
            }
            onToast={onToast}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 p-6">
        <button
          onClick={() => setActiveCategory(null)}
          className="mb-4 flex items-center gap-2 text-body-16 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Overview
        </button>

        <h2 className="text-h2 text-text-primary">{category.label}</h2>
        <div className="mt-2 flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-body-12 text-green">
            <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-current" />
            {category.passed} passed
          </span>
          {failed > 0 && (
            <span className="flex items-center gap-1.5 text-body-12 text-red">
              <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current" />
              {failed} to improve
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {sortedChecks.map((check) => (
            <CheckItem key={check.id} check={check}>
              {renderCheckRecommendation(check)}
            </CheckItem>
          ))}
        </div>
      </div>

      <Footer />
      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={hideToast}
      />
    </div>
  );
}
