import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  saveKeywordForUrl,
  getKeywordForUrl,
  saveAdvancedOptions,
  getAdvancedOptions,
} from "./storage";

describe("getStorageItem / setStorageItem / removeStorageItem", () => {
  it("returns null for a missing key", async () => {
    const result = await getStorageItem("nonexistent");
    expect(result).toBeNull();
  });

  it("round-trips a string value", async () => {
    await setStorageItem("greeting", "hello");
    const result = await getStorageItem<string>("greeting");
    expect(result).toBe("hello");
  });

  it("round-trips a number value", async () => {
    await setStorageItem("count", 42);
    const result = await getStorageItem<number>("count");
    expect(result).toBe(42);
  });

  it("round-trips an object value", async () => {
    const obj = { nested: true, items: [1, 2, 3] };
    await setStorageItem("config", obj);
    const result = await getStorageItem<typeof obj>("config");
    expect(result).toEqual(obj);
  });

  it("removes an item so subsequent get returns null", async () => {
    await setStorageItem("temp", "value");
    await removeStorageItem("temp");
    const result = await getStorageItem("temp");
    expect(result).toBeNull();
  });
});

describe("saveKeywordForUrl / getKeywordForUrl", () => {
  it("round-trips a keyword for a given URL", async () => {
    await saveKeywordForUrl("https://example.com/page", "seo keyword");
    const result = await getKeywordForUrl("https://example.com/other");
    expect(result).toBe("seo keyword");
  });

  it("returns null when no keyword has been saved", async () => {
    const result = await getKeywordForUrl("https://unsaved.com");
    expect(result).toBeNull();
  });

  it("overwrites the keyword when saving for the same hostname", async () => {
    await saveKeywordForUrl("https://example.com/a", "first");
    await saveKeywordForUrl("https://example.com/b", "second");
    const result = await getKeywordForUrl("https://example.com/c");
    expect(result).toBe("second");
  });

  it("keeps keywords independent across different hostnames", async () => {
    await saveKeywordForUrl("https://alpha.com", "alpha-kw");
    await saveKeywordForUrl("https://beta.com", "beta-kw");
    expect(await getKeywordForUrl("https://alpha.com")).toBe("alpha-kw");
    expect(await getKeywordForUrl("https://beta.com")).toBe("beta-kw");
  });
});

describe("saveAdvancedOptions / getAdvancedOptions", () => {
  const sampleOptions = {
    pageType: "blog",
    secondaryKeywords: "react, testing",
    language: "en",
  };

  it("round-trips advanced options for a site", async () => {
    await saveAdvancedOptions("example.com", sampleOptions);
    const result = await getAdvancedOptions("example.com");
    expect(result).toEqual(sampleOptions);
  });

  it("returns null when no options have been saved", async () => {
    const result = await getAdvancedOptions("unknown.com");
    expect(result).toBeNull();
  });

  it("keeps options independent across different sites", async () => {
    const optionsA = { pageType: "landing", secondaryKeywords: "a", language: "en" };
    const optionsB = { pageType: "docs", secondaryKeywords: "b", language: "fr" };

    await saveAdvancedOptions("site-a.com", optionsA);
    await saveAdvancedOptions("site-b.com", optionsB);

    expect(await getAdvancedOptions("site-a.com")).toEqual(optionsA);
    expect(await getAdvancedOptions("site-b.com")).toEqual(optionsB);
  });
});
