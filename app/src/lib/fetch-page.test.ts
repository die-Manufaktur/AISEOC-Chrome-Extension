import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { fetchAndAnalyzePage, detectJavaScriptRendering } from "./fetch-page";

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
    it("adds warning for JS-rendered sites with React root", async () => {
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

    it("adds warning for Next.js sites with __NEXT_DATA__", async () => {
      const nextJsHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Next.js App</title>
          <meta name="description" content="A Next.js site">
        </head>
        <body>
          <div id="__next"></div>
          <script id="__NEXT_DATA__" type="application/json">{"props":{}}</script>
          <script src="/_next/static/chunks/main.js"></script>
        </body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(nextJsHtml));

      const result = await fetchAndAnalyzePage("https://example.com/nextjs");

      expect(result.fetchWarnings).toBeDefined();
      expect(result.fetchWarnings?.[0]).toContain("JavaScript-rendered");
    });

    it("adds warning for Vue/Nuxt sites", async () => {
      const nuxtHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Nuxt App</title>
        </head>
        <body>
          <div id="__nuxt"></div>
          <script src="/js/app.js"></script>
          <script src="/js/vendor.js"></script>
        </body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(nuxtHtml));

      const result = await fetchAndAnalyzePage("https://example.com/nuxt");

      expect(result.fetchWarnings).toBeDefined();
      expect(result.fetchWarnings?.[0]).toContain("JavaScript-rendered");
    });

    it("adds warning when body has only scripts and empty divs", async () => {
      const emptyBodyHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SPA Shell</title>
          <meta name="description" content="An SPA">
        </head>
        <body>
          <div id="root"></div>
          <noscript>You need JavaScript to run this app.</noscript>
          <script src="/bundle.js"></script>
          <script src="/vendor.js"></script>
          <script src="/runtime.js"></script>
        </body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(emptyBodyHtml));

      const result = await fetchAndAnalyzePage("https://example.com/shell");

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

    it("detects SPA with moderate word count (50-100) from nav/footer but no real content", async () => {
      const spaWithNavHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>My SPA</title>
          <meta name="description" content="A single page application">
        </head>
        <body>
          <div id="root">
            <nav>Home About Contact Blog Products Services Portfolio Careers Press FAQ Support Terms Privacy</nav>
            <footer>Copyright 2026 My Company. All rights reserved. Built with React. Follow us on Twitter.</footer>
          </div>
          <script src="/static/js/main.abc123.js"></script>
          <script src="/static/js/vendor.def456.js"></script>
        </body>
        </html>
      `;
      mockFetch.mockResolvedValueOnce(createMockResponse(spaWithNavHtml));

      const result = await fetchAndAnalyzePage("https://example.com/spa-nav");

      // Should detect because: SPA root + low word count + multiple scripts + no h1
      expect(result.fetchWarnings).toBeDefined();
      expect(result.fetchWarnings?.[0]).toContain("JavaScript-rendered");
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

describe("detectJavaScriptRendering", () => {
  function parseDoc(html: string): Document {
    return new DOMParser().parseFromString(html, "text/html");
  }

  function getWordCount(doc: Document): number {
    const bodyText = doc.body?.textContent ?? "";
    return bodyText.split(/\s+/).filter(Boolean).length;
  }

  function getH1Count(doc: Document): number {
    return doc.querySelectorAll("h1").length;
  }

  it("returns false for a normal content-rich page", () => {
    const html = `
      <html>
      <head><title>Blog Post</title></head>
      <body>
        <h1>My Great Blog Post</h1>
        <p>This is a detailed article about web development best practices.
        It covers many topics including performance, accessibility, and SEO.
        The article goes into depth about each topic with practical examples
        and code snippets that developers can use in their own projects.
        We also discuss common pitfalls and how to avoid them effectively.</p>
        <script src="/analytics.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(false);
  });

  it("returns true for a typical Create React App shell", () => {
    const html = `
      <html>
      <head><title>React App</title></head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script src="/static/js/bundle.js"></script>
        <script src="/static/js/main.chunk.js"></script>
        <script src="/static/js/vendors~main.chunk.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(true);
  });

  it("returns true for a Next.js page with __NEXT_DATA__ and empty __next div", () => {
    const html = `
      <html>
      <head><title>Next App</title><meta name="description" content="desc"></head>
      <body>
        <div id="__next"></div>
        <script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{}}}</script>
        <script src="/_next/static/chunks/webpack.js"></script>
        <script src="/_next/static/chunks/main.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(true);
  });

  it("returns true for a Vue app with #app root", () => {
    const html = `
      <html>
      <head><title>Vue App</title></head>
      <body>
        <div id="app"></div>
        <script src="/js/chunk-vendors.js"></script>
        <script src="/js/app.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(true);
  });

  it("returns true for a Gatsby site with #__gatsby root", () => {
    const html = `
      <html>
      <head><title>Gatsby Site</title><meta name="description" content="desc"></head>
      <body>
        <div id="__gatsby"></div>
        <script id="gatsby-script-loader">/* loader */</script>
        <script src="/app.js"></script>
        <script src="/framework.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(true);
  });

  it("returns false for a page with enough real content even if it has SPA-like root", () => {
    // SSR'd Next.js page with actual content in the HTML
    const words = Array(150).fill("word").join(" ");
    const html = `
      <html>
      <head><title>SSR Page</title></head>
      <body>
        <div id="__next">
          <h1>Server Rendered Page</h1>
          <p>${words}</p>
        </div>
        <script src="/_next/static/chunks/main.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    // SPA root gives +2, but only 1 script (not >=2) so Signal 2 doesn't fire,
    // body has meaningful content so Signal 3 doesn't fire.
    // H1 present so Signal 6 doesn't fire. Score = 2, under threshold.
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(false);
  });

  it("returns true for body with only script and noscript tags", () => {
    const html = `
      <html>
      <head><title>App</title><meta name="viewport" content="width=device-width"></head>
      <body>
        <script src="/a.js"></script>
        <script src="/b.js"></script>
        <noscript>Enable JS</noscript>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(true);
  });

  it("returns false for a static page with scripts but rich content", () => {
    const paragraphs = Array(10)
      .fill(null)
      .map((_, i) => `<p>Paragraph ${i + 1} with enough text to be meaningful content on the page.</p>`)
      .join("\n");
    const html = `
      <html>
      <head><title>Static Page</title></head>
      <body>
        <h1>Main Title</h1>
        ${paragraphs}
        <script src="/analytics.js"></script>
        <script src="/tracking.js"></script>
      </body>
      </html>
    `;
    const doc = parseDoc(html);
    expect(detectJavaScriptRendering(doc, getWordCount(doc), getH1Count(doc))).toBe(false);
  });
});
