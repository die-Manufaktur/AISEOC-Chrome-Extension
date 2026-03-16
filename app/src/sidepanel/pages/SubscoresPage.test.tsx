import { render, screen } from "@testing-library/react";
import { useStore } from "@/lib/store";
import { SubscoresPage } from "./SubscoresPage";
import type { SEOAnalysis, PageSEOData } from "@/types/seo";

vi.mock("@/lib/openai", () => ({
  generateRecommendation: vi.fn().mockResolvedValue("suggested title"),
  generateH2Suggestion: vi.fn().mockResolvedValue("new h2"),
  generateAllH2Suggestions: vi.fn().mockResolvedValue(["new h2"]),
  generateAltText: vi.fn().mockResolvedValue("alt text"),
}));

vi.mock("@/lib/schema-recommendations", () => ({
  getSchemaRecommendations: vi.fn().mockReturnValue([]),
}));

vi.mock("@/lib/storage", () => ({
  getStorageItem: vi.fn().mockResolvedValue(null),
  setStorageItem: vi.fn().mockResolvedValue(undefined),
}));

const mockChecks = [
  {
    id: "title-present",
    title: "Page has a title tag",
    description: "test",
    status: "pass" as const,
    priority: "high" as const,
    category: "meta" as const,
    details: "Title found",
  },
  {
    id: "title-keyword",
    title: "Title contains keyword",
    description: "test",
    status: "fail" as const,
    priority: "high" as const,
    category: "meta" as const,
    details: "Not found",
    copyable: true,
  },
];

const mockPageData: PageSEOData = {
  url: "https://example.com",
  title: "Old Title",
  metaDescription: "",
  metaKeywords: "",
  canonical: "",
  h1: ["Old H1"],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  images: [],
  ogTags: {},
  twitterTags: {},
  wordCount: 0,
  internalLinks: 0,
  externalLinks: 0,
  lang: "",
  paragraphs: ["First paragraph"],
  resources: { js: [], css: [] },
  schemaMarkup: { types: [], count: 0 },
  ogImage: "",
  imageFileSizes: [],
  fetchWarnings: [],
};

const mockAnalysis: SEOAnalysis = {
  overallScore: 75,
  scoreLabel: "Fair",
  scoreDescription: "A solid start!",
  totalPassed: 15,
  totalFailed: 5,
  categories: [
    {
      category: "meta",
      label: "Meta Tags",
      score: 80,
      passed: 1,
      total: 2,
      checks: mockChecks,
    },
  ],
  pageData: mockPageData,
  keyword: "seo",
  timestamp: Date.now(),
};

beforeEach(() => {
  useStore.setState({
    view: "subscores",
    analysis: null,
    settings: {
      keyword: "seo",
      secondaryKeywords: "",
      pageType: "blog-post",
      language: "en",
      advancedMode: false,
      targetUrl: "",
    },
    activeCategory: null,
    apiKey: "",
    error: null,
    toast: { visible: false, message: "" },
  });
});

describe("SubscoresPage", () => {
  it("returns null when no analysis", () => {
    const { container } = render(<SubscoresPage />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null when no activeCategory", () => {
    useStore.setState({ analysis: mockAnalysis });
    const { container } = render(<SubscoresPage />);
    expect(container.innerHTML).toBe("");
  });

  it("renders category heading", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    expect(
      screen.getByRole("heading", { name: "Meta Tags" }),
    ).toBeInTheDocument();
  });

  it("shows passed count", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    expect(screen.getByText("1 passed")).toBeInTheDocument();
  });

  it("shows failed count", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    expect(screen.getByText("1 to improve")).toBeInTheDocument();
  });

  it("renders check items", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    expect(screen.getByText("Page has a title tag")).toBeInTheDocument();
    expect(screen.getByText("Title contains keyword")).toBeInTheDocument();
  });

  it("renders back button", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    // Back button is the ArrowLeft icon button
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows failing checks before passing checks", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    const titles = screen
      .getAllByText(/page has a title tag|title contains keyword/i)
      .map((el) => el.textContent);
    // Fail items sorted first
    expect(titles[0]).toBe("Title contains keyword");
    expect(titles[1]).toBe("Page has a title tag");
  });

  it("pass check items show their title", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    expect(screen.getByText("Page has a title tag")).toBeInTheDocument();
  });

  it("fail check items show their title", () => {
    useStore.setState({ analysis: mockAnalysis, activeCategory: "meta" });
    render(<SubscoresPage />);
    expect(screen.getByText("Title contains keyword")).toBeInTheDocument();
  });
});
