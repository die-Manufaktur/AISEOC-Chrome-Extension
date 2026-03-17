import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { fetchAndAnalyzePage } from "./fetch-page";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

function createMockResponse(html: string, options: { ok?: boolean; statusText?: string; contentType?: string } = {}) {
  const { ok = true, statusText = "OK", contentType = "text/html" } = options;
  return {
    ok,
    statusText,
    headers: {
      get: (name: string) => (name === "content-type" ? contentType : null),
    },
    text: () => Promise.resolve(html),
  };
}

const sampleHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test Page Title</title>
  <meta name="description" content="This is the meta description">
  <meta name="keywords" content="test, keywords, seo">
  <meta property="og:title" content="OG Title">
  <meta property="og:description" content="OG Description">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Twitter Title">
  <link rel="canonical" href="https://example.com/canonical-url">
  <link rel="stylesheet" href="/styles/main.css">
  <script src="/scripts/app.js"></script>
  <script type="application/ld+json">{"@type": "Article", "name": "Test Article"}</script>
</head>
<body>
  <h1>Main Heading</h1>
  <p>First paragraph with some content for testing purposes.</p>
  <h2>Section One</h2>
  <p>Another paragraph here.</p>
  <h2>Section Two</h2>
  <h3>Subsection</h3>
  <p>More content in the subsection.</p>
  <img src="/images/photo.jpg" alt="Photo description">
  <img src="https://cdn.example.com/image.png" alt="">
  <a href="/internal-link">Internal Link</a>
  <a href="https://external.com/page">External Link</a>
  <a href="/another-internal">Another Internal</a>
</body>
</html>
`;

describe("fetchAndAnalyzePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("basic parsing", () => {
    it("extracts title from the page", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.title).toBe("Test Page Title");
    });

    it("extracts meta description", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.metaDescription).toBe("This is the meta description");
    });

    it("extracts meta keywords", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.metaKeywords).toBe("test, keywords, seo");
    });

    it("extracts canonical URL", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.canonical).toBe("https://example.com/canonical-url");
    });

    it("extracts language attribute", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.lang).toBe("en");
    });

    it("preserves the original URL", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test-page");

      expect(result.url).toBe("https://example.com/test-page");
    });
  });

  describe("heading extraction", () => {
    it("extracts H1 headings", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.h1).toEqual(["Main Heading"]);
    });

    it("extracts H2 headings", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.h2).toEqual(["Section One", "Section Two"]);
    });

    it("extracts H3 headings", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.h3).toEqual(["Subsection"]);
    });

    it("returns empty arrays for missing heading levels", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.h4).toEqual([]);
      expect(result.h5).toEqual([]);
      expect(result.h6).toEqual([]);
    });
  });

  describe("image extraction", () => {
    it("extracts images with their attributes", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.images).toHaveLength(2);
      expect(result.images[0]).toEqual({
        src: "https://example.com/images/photo.jpg",
        alt: "Photo description",
        width: null,
        height: null,
      });
    });

    it("resolves relative image URLs to absolute", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.images[0].src).toBe("https://example.com/images/photo.jpg");
    });

    it("preserves absolute image URLs", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.images[1].src).toBe("https://cdn.example.com/image.png");
    });

    it("captures empty alt text", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.images[1].alt).toBe("");
    });
  });

  describe("link counting", () => {
    it("counts internal links correctly", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.internalLinks).toBe(2);
    });

    it("counts external links correctly", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.externalLinks).toBe(1);
    });
  });

  describe("Open Graph and Twitter tags", () => {
    it("extracts OG tags", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.ogTags["og:title"]).toBe("OG Title");
      expect(result.ogTags["og:description"]).toBe("OG Description");
      expect(result.ogTags["og:image"]).toBe("https://example.com/og-image.jpg");
    });

    it("extracts Twitter tags", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.twitterTags["twitter:card"]).toBe("summary_large_image");
      expect(result.twitterTags["twitter:title"]).toBe("Twitter Title");
    });

    it("extracts ogImage separately", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.ogImage).toBe("https://example.com/og-image.jpg");
    });
  });

  describe("content analysis", () => {
    it("calculates word count", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.wordCount).toBeGreaterThan(10);
    });

    it("extracts paragraphs", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.paragraphs).toContain("First paragraph with some content for testing purposes.");
      expect(result.paragraphs).toContain("Another paragraph here.");
    });
  });

  describe("resource extraction", () => {
    it("extracts JavaScript resources", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.resources.js).toContain("https://example.com/scripts/app.js");
    });

    it("extracts CSS resources", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.resources.css).toContain("https://example.com/styles/main.css");
    });
  });

  describe("schema markup", () => {
    it("extracts schema types from JSON-LD", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.schemaMarkup.types).toContain("Article");
      expect(result.schemaMarkup.count).toBe(1);
    });

    it("handles invalid JSON-LD gracefully", async () => {
      const htmlWithBadJsonLd = `
        <html>
        <head>
          <script type="application/ld+json">{ invalid json }</script>
        </head>
        <body><p>Content</p></body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(htmlWithBadJsonLd));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.schemaMarkup.types).toEqual([]);
      expect(result.schemaMarkup.count).toBe(1);
    });
  });

  describe("error handling", () => {
    it("throws error when fetch fails", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse("", { ok: false, statusText: "Not Found" }));

      await expect(fetchAndAnalyzePage("https://example.com/missing")).rejects.toThrow(
        "Failed to fetch page: Not Found"
      );
    });

    it("throws error when proxy returns JSON error", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse(
          JSON.stringify({ error: "Access denied" }),
          { contentType: "application/json" }
        )
      );

      await expect(fetchAndAnalyzePage("https://example.com/test")).rejects.toThrow("Access denied");
    });

    it("throws error for malformed JSON response", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse("not valid json", { contentType: "application/json" })
      );

      await expect(fetchAndAnalyzePage("https://example.com/test")).rejects.toThrow(
        "Unexpected response from proxy"
      );
    });
  });

  describe("JS-rendered site detection", () => {
    it("adds warning for JS-rendered sites", async () => {
      const jsRenderedHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>React App</title>
          <meta name="description" content="A React application">
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/main.js"></script>
          <script src="/static/js/vendor.js"></script>
        </body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(jsRenderedHtml));

      const result = await fetchAndAnalyzePage("https://example.com/spa");

      expect(result.fetchWarnings).toBeDefined();
      expect(result.fetchWarnings?.[0]).toContain("JavaScript-rendered");
    });

    it("adds warning for sparse content", async () => {
      const sparseHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>Sparse</title></head>
        <body>
          <p>Minimal content</p>
        </body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(sparseHtml));

      const result = await fetchAndAnalyzePage("https://example.com/sparse");

      expect(result.fetchWarnings).toBeDefined();
      expect(result.fetchWarnings?.[0]).toContain("Very little body content");
    });

    it("no warnings for well-structured pages", async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(sampleHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.fetchWarnings).toBeUndefined();
    });
  });

  describe("edge cases", () => {
    it("handles missing meta tags gracefully", async () => {
      const minimalHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>Minimal</title></head>
        <body><h1>Hello</h1><p>Some content here for word count.</p></body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(minimalHtml));

      const result = await fetchAndAnalyzePage("https://example.com/minimal");

      expect(result.metaDescription).toBe("");
      expect(result.metaKeywords).toBe("");
      expect(result.canonical).toBe("");
      expect(result.ogImage).toBe("");
    });

    it("handles missing body gracefully", async () => {
      const noBodyHtml = `<!DOCTYPE html><html><head><title>No Body</title></head></html>`;
      mockFetch.mockResolvedValueOnce(createMockResponse(noBodyHtml));

      const result = await fetchAndAnalyzePage("https://example.com/nobody");

      expect(result.wordCount).toBe(0);
      expect(result.paragraphs).toEqual([]);
    });

    it("handles multiple H1s", async () => {
      const multiH1Html = `
        <html><body>
          <h1>First H1</h1>
          <h1>Second H1</h1>
          <p>Some content for word count purposes here.</p>
        </body></html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(multiH1Html));

      const result = await fetchAndAnalyzePage("https://example.com/multi");

      expect(result.h1).toEqual(["First H1", "Second H1"]);
    });

    it("handles images without src", async () => {
      const noSrcImg = `<html><body><img alt="No source"><p>Content here.</p></body></html>`;
      mockFetch.mockResolvedValueOnce(createMockResponse(noSrcImg));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      expect(result.images[0].src).toBe("");
    });

    it("handles links with invalid URLs", async () => {
      const badLinksHtml = `
        <html><body>
          <a href="javascript:void(0)">JS Link</a>
          <a href="mailto:test@example.com">Email</a>
          <a href="/valid-internal">Valid</a>
          <p>Some content for word count.</p>
        </body></html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(badLinksHtml));

      const result = await fetchAndAnalyzePage("https://example.com/test");

      // Invalid URLs should be counted as internal
      expect(result.internalLinks).toBeGreaterThanOrEqual(1);
    });
  });
});
