export interface PageSEOData {
  url: string;
  title: string;
  metaDescription: string;
  metaKeywords: string;
  canonical: string;
  h1: string[];
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  images: ImageData[];
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  wordCount: number;
  internalLinks: number;
  externalLinks: number;
  lang: string;
  paragraphs: string[];
  resources: { js: string[]; css: string[] };
  schemaMarkup: { types: string[]; count: number };
  ogImage: string;
  imageFileSizes: { src: string; sizeBytes: number | null }[];
}

export interface ImageData {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export type CheckStatus = "pass" | "fail" | "warning";
export type CheckPriority = "high" | "medium" | "low";
export type CheckCategory = "meta" | "content" | "links" | "images" | "technical";

export interface SEOCheck {
  id: string;
  title: string;
  description: string;
  status: CheckStatus;
  priority: CheckPriority;
  category: CheckCategory;
  details?: string;
  learnMoreUrl?: string;
  recommendation?: string;
  h2Recommendations?: { index: number; text: string; suggestion: string }[];
  imageData?: ImageData[];
  copyable?: boolean;
}

export interface CategoryScore {
  category: CheckCategory;
  label: string;
  score: number;
  passed: number;
  total: number;
  checks: SEOCheck[];
}

export interface SEOAnalysis {
  overallScore: number;
  scoreLabel: string;
  scoreDescription: string;
  totalPassed: number;
  totalFailed: number;
  categories: CategoryScore[];
  pageData: PageSEOData;
  keyword: string;
  timestamp: number;
}

export interface AnalysisSettings {
  keyword: string;
  secondaryKeywords: string;
  pageType: string;
  language: string;
  advancedMode: boolean;
  targetUrl: string;
}

export interface AppState {
  view: "setup" | "loading" | "score" | "subscores";
  analysis: SEOAnalysis | null;
  settings: AnalysisSettings;
  activeCategory: CheckCategory | null;
  apiKey: string;
  error: string | null;
}

export interface SchemaRecommendation {
  name: string;
  description: string;
  documentationUrl: string;
  googleSupport: "yes" | "partial" | "no";
  googleSupportNote?: string;
  jsonLdCode: string;
  isRequired: boolean;
}

export interface PageTypeSchema {
  pageType: string;
  schemas: SchemaRecommendation[];
}

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}
