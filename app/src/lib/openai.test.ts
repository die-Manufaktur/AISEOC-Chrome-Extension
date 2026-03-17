import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// Create a mock for the chat.completions.create method
const mockCreate = vi.fn();

// Mock the OpenAI module before imports
vi.mock("openai", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    })),
  };
});

// Import after mocking
import {
  generateRecommendation,
  generateH2Suggestion,
  generateAllH2Suggestions,
  generateAltText,
  generateTitle,
  generateMetaDescription,
} from "./openai";

function mockSuccessResponse(content: string) {
  mockCreate.mockResolvedValueOnce({
    choices: [{ message: { content } }],
  });
}

function mockErrorResponse(status: number, message: string) {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  mockCreate.mockRejectedValueOnce(error);
}

describe("openai", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreate.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("generateRecommendation", () => {
    it("generates a title recommendation", async () => {
      mockSuccessResponse("Best SEO Tips for 2024 | Complete Guide");

      const result = await generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO tips",
        "My Blog About SEO",
      );

      expect(result).toBe("Best SEO Tips for 2024 | Complete Guide");
      expect(mockCreate).toHaveBeenCalledOnce();
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "gpt-3.5-turbo",
          max_tokens: 500,
          temperature: 0.7,
        }),
      );
    });

    it("generates a meta description recommendation", async () => {
      mockSuccessResponse("Learn the best SEO tips to improve your rankings. Get actionable advice now!");

      const result = await generateRecommendation(
        "test-api-key",
        "meta-description-keyword",
        "SEO tips",
        "Current description here",
      );

      expect(result).toBe("Learn the best SEO tips to improve your rankings. Get actionable advice now!");
    });

    it("generates a URL slug recommendation", async () => {
      mockSuccessResponse("seo-tips-guide");

      const result = await generateRecommendation(
        "test-api-key",
        "keyword-url",
        "SEO tips",
        "https://example.com/old-url",
      );

      expect(result).toBe("seo-tips-guide");
    });

    it("generates an H1 recommendation", async () => {
      mockSuccessResponse("The Ultimate Guide to SEO Tips");

      const result = await generateRecommendation(
        "test-api-key",
        "h1-keyword",
        "SEO tips",
        "Welcome to my site",
      );

      expect(result).toBe("The Ultimate Guide to SEO Tips");
    });

    it("generates an intro paragraph recommendation", async () => {
      mockSuccessResponse("Discover essential SEO tips that will transform your website's visibility.");

      const result = await generateRecommendation(
        "test-api-key",
        "keyword-intro",
        "SEO tips",
        "This is my introduction paragraph.",
      );

      expect(result).toBe("Discover essential SEO tips that will transform your website's visibility.");
    });

    it("generates advisory content for non-copyable checks", async () => {
      mockSuccessResponse("Increase your internal linking to improve SEO crawlability.");

      const result = await generateRecommendation(
        "test-api-key",
        "internal-links",
        "SEO tips",
        "Currently 2 internal links",
      );

      expect(result).toBe("Increase your internal linking to improve SEO crawlability.");
    });

    it("handles keyword-density check", async () => {
      mockSuccessResponse("Optimize keyword density for better SEO.");

      const result = await generateRecommendation(
        "test-api-key",
        "keyword-density",
        "SEO",
        "Low density",
      );

      expect(result).toBe("Optimize keyword density for better SEO.");
    });

    it("handles word-count check", async () => {
      mockSuccessResponse("Add more content.");

      const result = await generateRecommendation(
        "test-api-key",
        "word-count",
        "SEO",
        "300 words",
      );

      expect(result).toBe("Add more content.");
    });

    it("handles unknown check IDs with generic advice", async () => {
      mockSuccessResponse("Generic SEO advice for this issue.");

      const result = await generateRecommendation(
        "test-api-key",
        "unknown-check-id",
        "SEO tips",
        "Some context",
      );

      expect(result).toBe("Generic SEO advice for this issue.");
    });

    it("strips wrapping double quotes from response", async () => {
      mockSuccessResponse('"Best SEO Tips for 2024"');

      const result = await generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO tips",
        "Current title",
      );

      expect(result).toBe("Best SEO Tips for 2024");
    });

    it("strips wrapping single quotes from response", async () => {
      mockSuccessResponse("'Best SEO Tips for 2024'");

      const result = await generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO tips",
        "Current title",
      );

      expect(result).toBe("Best SEO Tips for 2024");
    });

    it("includes advanced options in user prompt", async () => {
      mockSuccessResponse("SEO Tips for Your Landing Page");

      await generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO tips",
        "Current title",
        {
          pageType: "landing-page",
          secondaryKeywords: "marketing, conversion",
        },
      );

      const callArgs = mockCreate.mock.calls[0][0];
      const userMessage = callArgs.messages.find((m: { role: string }) => m.role === "user");
      expect(userMessage.content).toContain("landing page");
    });

    it("throws immediately on 401 auth error without retry", async () => {
      mockErrorResponse(401, "Invalid API key");

      await expect(
        generateRecommendation("bad-key", "title-keyword", "SEO", "context"),
      ).rejects.toThrow("Invalid API key");

      // Should only be called once (no retries for auth errors)
      expect(mockCreate).toHaveBeenCalledOnce();
    });

    it("throws immediately on 403 forbidden error without retry", async () => {
      mockErrorResponse(403, "Forbidden");

      await expect(
        generateRecommendation("bad-key", "title-keyword", "SEO", "context"),
      ).rejects.toThrow("Forbidden");

      expect(mockCreate).toHaveBeenCalledOnce();
    });

    it("retries on transient errors then succeeds", async () => {
      vi.useFakeTimers();

      // First call fails with a transient error
      mockCreate.mockRejectedValueOnce(new Error("Network error"));
      // Second call succeeds
      mockSuccessResponse("Success after retry");

      const promise = generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO",
        "context",
      );

      // Fast-forward through retry delay
      await vi.runAllTimersAsync();

      const result = await promise;

      expect(result).toBe("Success after retry");
      expect(mockCreate).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });

    it("throws after max retries exceeded", async () => {
      vi.useFakeTimers();

      // All calls fail
      const error = new Error("Persistent network error");
      mockCreate.mockRejectedValueOnce(error);
      mockCreate.mockRejectedValueOnce(error);
      mockCreate.mockRejectedValueOnce(error);

      const promise = generateRecommendation("test-api-key", "title-keyword", "SEO", "context");

      // Fast-forward through retry delays
      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow("Persistent network error");

      // Initial + 2 retries = 3 total calls
      expect(mockCreate).toHaveBeenCalledTimes(3);

      vi.useRealTimers();
    });

    it("returns empty string when API returns null content", async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: null } }],
      });

      const result = await generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO",
        "context",
      );

      expect(result).toBe("");
    });

    it("returns empty string when API returns undefined content", async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: {} }],
      });

      const result = await generateRecommendation(
        "test-api-key",
        "title-keyword",
        "SEO",
        "context",
      );

      expect(result).toBe("");
    });
  });

  describe("generateH2Suggestion", () => {
    it("generates an H2 suggestion", async () => {
      mockSuccessResponse("Why SEO Tips Matter for Your Business");

      const result = await generateH2Suggestion(
        "test-api-key",
        "About Us",
        "SEO tips",
      );

      expect(result).toBe("Why SEO Tips Matter for Your Business");
    });

    it("includes keyword in the prompt", async () => {
      mockSuccessResponse("SEO Tips Section");

      await generateH2Suggestion("test-api-key", "About", "my keyword");

      const callArgs = mockCreate.mock.calls[0][0];
      const userMessage = callArgs.messages.find((m: { role: string }) => m.role === "user");
      expect(userMessage.content).toContain("my keyword");
    });

    it("includes advanced options when provided", async () => {
      mockSuccessResponse("Les Conseils SEO Essentiels");

      await generateH2Suggestion(
        "test-api-key",
        "About",
        "SEO tips",
        { languageCode: "fr", pageType: "blog" },
      );

      const callArgs = mockCreate.mock.calls[0][0];
      const systemMessage = callArgs.messages.find((m: { role: string }) => m.role === "system");
      expect(systemMessage.content).toContain("French");
    });
  });

  describe("generateAllH2Suggestions", () => {
    it("generates suggestions for all H2s", async () => {
      mockSuccessResponse("First SEO Tips Heading");
      mockSuccessResponse("Second SEO Tips Section");
      mockSuccessResponse("Third SEO Tips Guide");

      const result = await generateAllH2Suggestions(
        "test-api-key",
        ["Heading 1", "Heading 2", "Heading 3"],
        "SEO tips",
      );

      expect(result).toHaveLength(3);
      expect(result[0]).toBe("First SEO Tips Heading");
      expect(result[1]).toBe("Second SEO Tips Section");
      expect(result[2]).toBe("Third SEO Tips Guide");
    });

    it("handles empty H2 array", async () => {
      const result = await generateAllH2Suggestions(
        "test-api-key",
        [],
        "SEO tips",
      );

      expect(result).toEqual([]);
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it("handles single H2", async () => {
      mockSuccessResponse("Single Heading About SEO Tips");

      const result = await generateAllH2Suggestions(
        "test-api-key",
        ["Original Heading"],
        "SEO tips",
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toBe("Single Heading About SEO Tips");
    });
  });

  describe("generateAltText", () => {
    it("generates alt text for an image", async () => {
      mockSuccessResponse("Team discussing SEO tips in a modern office");

      const result = await generateAltText(
        "test-api-key",
        "https://example.com/images/team-meeting.jpg",
        "SEO tips",
      );

      expect(result).toBe("Team discussing SEO tips in a modern office");
    });

    it("extracts filename from image URL", async () => {
      mockSuccessResponse("Product screenshot showing SEO tips");

      await generateAltText(
        "test-api-key",
        "https://example.com/images/product-screenshot.png?v=123",
        "SEO tips",
      );

      const callArgs = mockCreate.mock.calls[0][0];
      const userMessage = callArgs.messages.find((m: { role: string }) => m.role === "user");
      expect(userMessage.content).toContain("product-screenshot.png");
    });

    it("handles URL without query params", async () => {
      mockSuccessResponse("Hero image alt text");

      await generateAltText(
        "test-api-key",
        "https://example.com/hero.webp",
        "keyword",
      );

      const callArgs = mockCreate.mock.calls[0][0];
      const userMessage = callArgs.messages.find((m: { role: string }) => m.role === "user");
      expect(userMessage.content).toContain("hero.webp");
    });
  });

  describe("legacy exports", () => {
    it("generateTitle calls generateRecommendation with title-keyword", async () => {
      mockSuccessResponse("Generated Title");

      const result = await generateTitle(
        "test-api-key",
        "keyword",
        "context",
      );

      expect(result).toBe("Generated Title");
      expect(mockCreate).toHaveBeenCalledOnce();
    });

    it("generateMetaDescription calls generateRecommendation with meta-description-keyword", async () => {
      mockSuccessResponse("Generated meta description");

      const result = await generateMetaDescription(
        "test-api-key",
        "keyword",
        "context",
      );

      expect(result).toBe("Generated meta description");
      expect(mockCreate).toHaveBeenCalledOnce();
    });

    it("legacy exports support advanced options", async () => {
      mockSuccessResponse("Title with options");

      await generateTitle(
        "test-api-key",
        "keyword",
        "context",
        { pageType: "blog" },
      );

      const callArgs = mockCreate.mock.calls[0][0];
      const userMessage = callArgs.messages.find((m: { role: string }) => m.role === "user");
      expect(userMessage.content).toContain("blog");
    });
  });
});
