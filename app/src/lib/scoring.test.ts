import type { SEOCheck, PageSEOData, CheckCategory } from "@/types/seo";
import { calculateAnalysis } from "./scoring";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCheck(overrides: Partial<SEOCheck> = {}): SEOCheck {
  return {
    id: "test",
    title: "Test",
    description: "Test",
    status: "pass",
    priority: "medium",
    category: "meta",
    ...overrides,
  };
}

const minimalPageData: PageSEOData = {
  url: "https://example.com",
  title: "Example",
  metaDescription: "A test page",
  metaKeywords: "test",
  canonical: "https://example.com",
  h1: ["Example"],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  images: [],
  ogTags: {},
  twitterTags: {},
  wordCount: 100,
  internalLinks: 1,
  externalLinks: 0,
  lang: "en",
  paragraphs: ["Hello world."],
  resources: { js: [], css: [] },
  schemaMarkup: { types: [], count: 0 },
  ogImage: "",
  imageFileSizes: [],
};

const allCategories: CheckCategory[] = [
  "meta",
  "content",
  "links",
  "images",
  "technical",
];

/** Create one passing check per category. */
function onePassPerCategory(): SEOCheck[] {
  return allCategories.map((cat) =>
    makeCheck({ id: `${cat}-pass`, category: cat, status: "pass" }),
  );
}

/** Create one failing check per category. */
function oneFailPerCategory(): SEOCheck[] {
  return allCategories.map((cat) =>
    makeCheck({ id: `${cat}-fail`, category: cat, status: "fail" }),
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("calculateAnalysis", () => {
  // ---- 1. All pass → 100, Excellent -----------------------------------
  it("returns overallScore 100 and label 'Excellent' when all checks pass", () => {
    const checks = onePassPerCategory();
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    expect(result.overallScore).toBe(100);
    expect(result.scoreLabel).toBe("Excellent");
  });

  // ---- 2. All fail → 0, Poor ------------------------------------------
  it("returns overallScore 0 and label 'Poor' when all checks fail", () => {
    const checks = oneFailPerCategory();
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    expect(result.overallScore).toBe(0);
    expect(result.scoreLabel).toBe("Poor");
  });

  // ---- 3. Mixed pass/fail → correct weighted average -------------------
  it("calculates the correct weighted average for mixed results", () => {
    // meta: 1 pass, 1 fail → 50  (weight 0.25)
    // content: 1 pass          → 100 (weight 0.25)
    // links: 1 fail            → 0   (weight 0.15)
    // images: 1 pass           → 100 (weight 0.15)
    // technical: 1 fail        → 0   (weight 0.20)
    // expected = 50*0.25 + 100*0.25 + 0*0.15 + 100*0.15 + 0*0.20 = 52.5 → 53
    const checks: SEOCheck[] = [
      makeCheck({ id: "m1", category: "meta", status: "pass" }),
      makeCheck({ id: "m2", category: "meta", status: "fail" }),
      makeCheck({ id: "c1", category: "content", status: "pass" }),
      makeCheck({ id: "l1", category: "links", status: "fail" }),
      makeCheck({ id: "i1", category: "images", status: "pass" }),
      makeCheck({ id: "t1", category: "technical", status: "fail" }),
    ];

    const result = calculateAnalysis(checks, minimalPageData, "seo");
    expect(result.overallScore).toBe(53);
  });

  // ---- 4. Warnings count as 0.5 ---------------------------------------
  it("treats warnings as 0.5 in category score calculation", () => {
    // meta: 1 warning → 0.5/1 * 100 = 50
    // all other categories empty → 100 each
    // overall = 50*0.25 + 100*0.25 + 100*0.15 + 100*0.15 + 100*0.20 = 87.5 → 88
    const checks: SEOCheck[] = [
      makeCheck({ id: "m1", category: "meta", status: "warning" }),
    ];
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    expect(result.overallScore).toBe(88);
    const metaCat = result.categories.find((c) => c.category === "meta");
    expect(metaCat?.score).toBe(50);
  });

  // ---- 5. Score label thresholds --------------------------------------
  describe("score label thresholds", () => {
    // Build checks that produce a specific overall score by using a single
    // category (meta, weight 0.25) with the rest empty (100 each).
    // overallScore = metaScore * 0.25 + 100 * 0.75
    // To get target T: metaScore = (T - 75) / 0.25

    it("returns 'Excellent' at score 90", () => {
      // Need metaScore = (90-75)/0.25 = 60 → 3 pass, 2 fail = 60
      const checks: SEOCheck[] = [
        makeCheck({ id: "m1", category: "meta", status: "pass" }),
        makeCheck({ id: "m2", category: "meta", status: "pass" }),
        makeCheck({ id: "m3", category: "meta", status: "pass" }),
        makeCheck({ id: "m4", category: "meta", status: "fail" }),
        makeCheck({ id: "m5", category: "meta", status: "fail" }),
      ];
      const result = calculateAnalysis(checks, minimalPageData, "seo");
      expect(result.overallScore).toBe(90);
      expect(result.scoreLabel).toBe("Excellent");
    });

    it("returns 'Great' at score 80", () => {
      // Need metaScore = (80-75)/0.25 = 20 → 1 pass, 4 fail = 20
      const checks: SEOCheck[] = [
        makeCheck({ id: "m1", category: "meta", status: "pass" }),
        makeCheck({ id: "m2", category: "meta", status: "fail" }),
        makeCheck({ id: "m3", category: "meta", status: "fail" }),
        makeCheck({ id: "m4", category: "meta", status: "fail" }),
        makeCheck({ id: "m5", category: "meta", status: "fail" }),
      ];
      const result = calculateAnalysis(checks, minimalPageData, "seo");
      expect(result.overallScore).toBe(80);
      expect(result.scoreLabel).toBe("Great");
    });

    it("returns 'Fair' at score 60", () => {
      // meta: all fail → 0. content: all fail → 0.
      // overall = 0*0.25 + 0*0.25 + 100*0.15 + 100*0.15 + 100*0.20 = 50
      // That gives 50, not 60. Let's use a different approach:
      // meta: 0, content: 0, links: 0, images: 100, technical: 100
      // = 0 + 0 + 0 + 15 + 20 = 35. Still not 60.
      // Better: meta:0, content:100, links:100, images:0, technical:0
      // = 0 + 25 + 15 + 0 + 0 = 40. Nope.
      // Let's just get exactly 60 via meta only.
      // Need metaScore = (60-75)/0.25 = -60. Negative, not possible.
      // Use two categories. meta fail + content fail:
      // = 0*0.25 + 0*0.25 + 100*0.15 + 100*0.15 + 100*0.20 = 50
      // Add a warning in meta: 50*0.25 + 0*0.25 + 100*0.5 = 62.5→63
      // Let me just compute directly:
      // meta: 2 pass, 1 fail → 67; content: 1 pass, 1 fail → 50
      // links/images/technical empty → 100
      // 67*0.25 + 50*0.25 + 100*0.15 + 100*0.15 + 100*0.20 = 16.75+12.5+15+15+20=79.25→79
      // Going simpler: just verify the label boundary at 60 exactly.
      // meta: 10 checks, all fail → 0. content: 10, all fail → 0.
      // links: 2 pass, 1 fail → 67. images: 2 pass, 1 fail → 67.
      // technical: 2 pass, 1 fail → 67.
      // 0 + 0 + 67*0.15 + 67*0.15 + 67*0.20 = 10.05 + 10.05 + 13.4 = 33.5 → 34
      // This is getting complicated. Let me just build the right set numerically.
      // Target 60. With only meta checks and rest empty (100 * 0.75 = 75):
      // 60 = metaScore * 0.25 + 75 → metaScore = -60. Impossible.
      // Need to lower other categories too.
      // meta: 0 (1 fail), content: 0 (1 fail), rest empty (100)
      // 0 + 0 + 15 + 15 + 20 = 50
      // meta: 50 (1 warning), content: 0, rest empty
      // 12.5 + 0 + 15 + 15 + 20 = 62.5 → 63
      // meta: 100 (1 pass), content: 0, links: 0, images: empty, tech: empty
      // 25 + 0 + 0 + 15 + 20 = 60 ✓
      const checks: SEOCheck[] = [
        makeCheck({ id: "m1", category: "meta", status: "pass" }),
        makeCheck({ id: "c1", category: "content", status: "fail" }),
        makeCheck({ id: "l1", category: "links", status: "fail" }),
      ];
      const result = calculateAnalysis(checks, minimalPageData, "seo");
      expect(result.overallScore).toBe(60);
      expect(result.scoreLabel).toBe("Fair");
    });

    it("returns 'Needs Work' at score 40", () => {
      // meta: 0, content: 0, links: 0, images: 0, technical: 100 (1 pass)
      // 0 + 0 + 0 + 0 + 20 = 20. Too low.
      // meta: 0, content: 0, links: 100, images: 100, technical: 0
      // 0 + 0 + 15 + 15 + 0 = 30. Still low.
      // meta: 100, content: 0, links: 0, images: 0, technical: 100
      // 25 + 0 + 0 + 0 + 20 = 45
      // meta: 50, content: 0, links: 0, images: 0, technical: 100
      // 12.5 + 0 + 0 + 0 + 20 = 32.5 → 33
      // meta: 100, content: 0, links: 100, images: 0, technical: 0
      // 25 + 0 + 15 + 0 + 0 = 40 ✓
      const checks: SEOCheck[] = [
        makeCheck({ id: "m1", category: "meta", status: "pass" }),
        makeCheck({ id: "c1", category: "content", status: "fail" }),
        makeCheck({ id: "i1", category: "images", status: "fail" }),
        makeCheck({ id: "t1", category: "technical", status: "fail" }),
      ];
      // links empty → 100 * 0.15 = 15
      // 25 + 0 + 15 + 0 + 0 = 40
      const result = calculateAnalysis(checks, minimalPageData, "seo");
      expect(result.overallScore).toBe(40);
      expect(result.scoreLabel).toBe("Needs Work");
    });

    it("returns 'Poor' at score below 40", () => {
      // All categories fail: score 0
      const checks = oneFailPerCategory();
      const result = calculateAnalysis(checks, minimalPageData, "seo");
      expect(result.overallScore).toBeLessThan(40);
      expect(result.scoreLabel).toBe("Poor");
    });
  });

  // ---- 6. Score descriptions match thresholds --------------------------
  describe("score descriptions", () => {
    it("returns correct description for Excellent (>=90)", () => {
      const result = calculateAnalysis(
        onePassPerCategory(),
        minimalPageData,
        "seo",
      );
      expect(result.scoreDescription).toBe(
        "Your page is well-optimized for search engines!",
      );
    });

    it("returns correct description for Poor (<40)", () => {
      const result = calculateAnalysis(
        oneFailPerCategory(),
        minimalPageData,
        "seo",
      );
      expect(result.scoreDescription).toBe(
        "Significant SEO improvements are needed.",
      );
    });
  });

  // ---- 7. totalPassed and totalFailed counts ---------------------------
  it("correctly counts totalPassed and totalFailed", () => {
    const checks: SEOCheck[] = [
      makeCheck({ id: "1", category: "meta", status: "pass" }),
      makeCheck({ id: "2", category: "meta", status: "fail" }),
      makeCheck({ id: "3", category: "content", status: "warning" }),
      makeCheck({ id: "4", category: "links", status: "pass" }),
      makeCheck({ id: "5", category: "images", status: "fail" }),
    ];
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    expect(result.totalPassed).toBe(2);
    // warnings and fails both count as "not passed"
    expect(result.totalFailed).toBe(3);
  });

  // ---- 8. Categories array has 5 entries -------------------------------
  it("always returns exactly 5 categories", () => {
    const checks = [makeCheck({ id: "m1", category: "meta", status: "pass" })];
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    expect(result.categories).toHaveLength(5);
    const categoryNames = result.categories.map((c) => c.category);
    expect(categoryNames).toEqual(
      expect.arrayContaining([
        "meta",
        "content",
        "links",
        "images",
        "technical",
      ]),
    );
  });

  // ---- 9. Each category has correct label, passed count, checks --------
  it("populates category label, passed count, and checks array", () => {
    const checks: SEOCheck[] = [
      makeCheck({ id: "m1", category: "meta", status: "pass" }),
      makeCheck({ id: "m2", category: "meta", status: "fail" }),
      makeCheck({ id: "c1", category: "content", status: "pass" }),
    ];
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    const meta = result.categories.find((c) => c.category === "meta")!;
    expect(meta.label).toBe("Meta Tags");
    expect(meta.passed).toBe(1);
    expect(meta.total).toBe(2);
    expect(meta.checks).toHaveLength(2);

    const content = result.categories.find((c) => c.category === "content")!;
    expect(content.label).toBe("Content Analysis");
    expect(content.passed).toBe(1);
    expect(content.total).toBe(1);
    expect(content.checks).toHaveLength(1);
  });

  // ---- 10. Empty category scores 100 ----------------------------------
  it("scores an empty category as 100", () => {
    // Only meta has checks; other categories should be 100
    const checks = [makeCheck({ id: "m1", category: "meta", status: "pass" })];
    const result = calculateAnalysis(checks, minimalPageData, "seo");

    for (const cat of result.categories) {
      if (cat.category !== "meta") {
        expect(cat.score).toBe(100);
        expect(cat.total).toBe(0);
      }
    }
  });

  // ---- Additional: passes through pageData and keyword -----------------
  it("passes through pageData and keyword unchanged", () => {
    const result = calculateAnalysis(
      onePassPerCategory(),
      minimalPageData,
      "my keyword",
    );

    expect(result.pageData).toBe(minimalPageData);
    expect(result.keyword).toBe("my keyword");
  });

  // ---- Additional: timestamp is present --------------------------------
  it("includes a numeric timestamp", () => {
    const before = Date.now();
    const result = calculateAnalysis(
      onePassPerCategory(),
      minimalPageData,
      "seo",
    );
    const after = Date.now();

    expect(result.timestamp).toBeGreaterThanOrEqual(before);
    expect(result.timestamp).toBeLessThanOrEqual(after);
  });
});
