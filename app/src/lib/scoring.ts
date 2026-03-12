import type {
  SEOCheck,
  SEOAnalysis,
  CategoryScore,
  CheckCategory,
  PageSEOData,
} from "@/types/seo";
import { groupChecksByCategory } from "./seo-analyzer";

const categoryLabels: Record<CheckCategory, string> = {
  meta: "Meta Tags",
  content: "Content Analysis",
  links: "Links",
  images: "Images",
  technical: "Technical SEO",
};

const categoryWeights: Record<CheckCategory, number> = {
  meta: 0.25,
  content: 0.25,
  links: 0.15,
  images: 0.15,
  technical: 0.20,
};

function calculateCategoryScore(checks: SEOCheck[]): number {
  if (checks.length === 0) return 100;
  let score = 0;
  for (const check of checks) {
    if (check.status === "pass") score += 1;
    else if (check.status === "warning") score += 0.5;
  }
  return Math.round((score / checks.length) * 100);
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Work";
  return "Poor";
}

function getScoreDescription(score: number): string {
  if (score >= 90)
    return "Your page is well-optimized for search engines!";
  if (score >= 80)
    return "Great job! A few tweaks could push you to the top.";
  if (score >= 60)
    return "A solid start! Address the issues below to improve rankings.";
  if (score >= 40)
    return "There are several areas that need attention.";
  return "Significant SEO improvements are needed.";
}

/**
 * Scoring uses category-based weighting (meta=0.25, content=0.25, links=0.15,
 * images=0.15, technical=0.20) with pass/warning/fail within each category.
 * This ensures balanced coverage across all SEO aspects.
 */
export function calculateAnalysis(
  checks: SEOCheck[],
  pageData: PageSEOData,
  keyword: string,
): SEOAnalysis {
  const grouped = groupChecksByCategory(checks);

  const categories: CategoryScore[] = (
    Object.entries(grouped) as [CheckCategory, SEOCheck[]][]
  ).map(([category, categoryChecks]) => ({
    category,
    label: categoryLabels[category],
    score: calculateCategoryScore(categoryChecks),
    passed: categoryChecks.filter((c) => c.status === "pass").length,
    total: categoryChecks.length,
    checks: categoryChecks,
  }));

  let overallScore = 0;
  for (const cat of categories) {
    overallScore += cat.score * categoryWeights[cat.category];
  }
  overallScore = Math.round(overallScore);

  const totalPassed = checks.filter((c) => c.status === "pass").length;
  const totalFailed = checks.filter((c) => c.status !== "pass").length;

  return {
    overallScore,
    scoreLabel: getScoreLabel(overallScore),
    scoreDescription: getScoreDescription(overallScore),
    totalPassed,
    totalFailed,
    categories,
    pageData,
    keyword,
    timestamp: Date.now(),
  };
}
