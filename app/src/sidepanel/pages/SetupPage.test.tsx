import { render, screen } from "@testing-library/react";
import { useStore } from "@/lib/store";
import { SetupPage } from "./SetupPage";

vi.mock("@/lib/storage", () => ({
  getKeywordForUrl: vi.fn().mockResolvedValue(null),
  getAdvancedOptions: vi.fn().mockResolvedValue(null),
  getStorageItem: vi.fn().mockResolvedValue(null),
  setStorageItem: vi.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  useStore.setState({
    view: "setup",
    analysis: null,
    settings: {
      keyword: "",
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

describe("SetupPage", () => {
  const onAnalyze = vi.fn();

  it("renders heading 'Set up your SEO analysis'", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(
      screen.getByRole("heading", { name: /set up your seo analysis/i }),
    ).toBeInTheDocument();
  });

  it("renders 'Main keyword' input", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(screen.getByLabelText(/main keyword/i)).toBeInTheDocument();
  });

  it("renders 'Optimize my SEO' button", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(
      screen.getByRole("button", { name: /optimize my seo/i }),
    ).toBeInTheDocument();
  });

  it("button is disabled when keyword is empty", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(
      screen.getByRole("button", { name: /optimize my seo/i }),
    ).toBeDisabled();
  });

  it("button is enabled when keyword and targetUrl are entered", () => {
    useStore.setState({
      settings: {
        keyword: "react testing",
        secondaryKeywords: "",
        pageType: "blog-post",
        language: "en",
        advancedMode: false,
        targetUrl: "https://example.com",
      },
    });
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(
      screen.getByRole("button", { name: /optimize my seo/i }),
    ).toBeEnabled();
  });

  it("renders Advanced Analysis toggle", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(screen.getByText(/advanced analysis/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("hides advanced fields when advancedMode is false", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(screen.queryByLabelText(/page type/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/ai recommendations language/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(/seo webflow/i),
    ).not.toBeInTheDocument();
  });

  it("shows advanced fields when advancedMode is true", () => {
    useStore.setState({
      settings: {
        keyword: "",
        secondaryKeywords: "",
        pageType: "blog-post",
        language: "en",
        advancedMode: true,
        targetUrl: "",
      },
    });
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(screen.getByLabelText(/page type/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/ai recommendations language/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/seo webflow/i),
    ).toBeInTheDocument();
  });

  it("shows page type select in advanced mode", () => {
    useStore.setState({
      settings: {
        keyword: "",
        secondaryKeywords: "",
        pageType: "blog-post",
        language: "en",
        advancedMode: true,
        targetUrl: "",
      },
    });
    render(<SetupPage onAnalyze={onAnalyze} />);
    const pageTypeSelect = screen.getByLabelText(/page type/i);
    expect(pageTypeSelect).toBeInTheDocument();
    expect(pageTypeSelect).toHaveValue("blog-post");
  });

  it("shows language select in advanced mode", () => {
    useStore.setState({
      settings: {
        keyword: "",
        secondaryKeywords: "",
        pageType: "blog-post",
        language: "en",
        advancedMode: true,
        targetUrl: "",
      },
    });
    render(<SetupPage onAnalyze={onAnalyze} />);
    const langSelect = screen.getByLabelText(/ai recommendations language/i);
    expect(langSelect).toBeInTheDocument();
    expect(langSelect).toHaveValue("en");
  });

  it("shows secondary keywords textarea in advanced mode", () => {
    useStore.setState({
      settings: {
        keyword: "",
        secondaryKeywords: "",
        pageType: "blog-post",
        language: "en",
        advancedMode: true,
        targetUrl: "",
      },
    });
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(
      screen.getByPlaceholderText(/seo webflow/i),
    ).toBeInTheDocument();
  });

  it("shows character counter for secondary keywords", () => {
    useStore.setState({
      settings: {
        keyword: "",
        secondaryKeywords: "hello",
        pageType: "blog-post",
        language: "en",
        advancedMode: true,
        targetUrl: "",
      },
    });
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(screen.getByText(/5\/2000 characters/i)).toBeInTheDocument();
  });

  it("shows 'Page URL to analyze' input in dev mode", () => {
    render(<SetupPage onAnalyze={onAnalyze} />);
    expect(screen.getByLabelText(/page url to analyze/i)).toBeInTheDocument();
  });
});
