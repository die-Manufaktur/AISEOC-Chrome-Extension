/**
 * Self-contained page data extraction function for chrome.scripting.executeScript.
 *
 * This function is serialized and injected into the page context — it CANNOT
 * reference any imports, closures, or external variables. Keep it self-contained.
 *
 * Used by both the service worker (EXTRACT_PAGE_DATA handler) and the side panel
 * (directExecuteScript fallback). The canonical typed version lives in
 * content/analyzer.ts; keep both in sync when modifying extraction logic.
 */
export function extractPageDataInline() {
  const getMetaContent = (name: string): string => {
    const el =
      document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`) ||
      document.querySelector<HTMLMetaElement>(`meta[property="${name}"]`);
    return el?.content ?? "";
  };

  const getHeadings = (tag: string): string[] =>
    Array.from(document.querySelectorAll(tag)).map(
      (el) => el.textContent?.trim() ?? "",
    );

  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>("img"),
  ).map((img) => ({
    src: img.src,
    alt: img.alt ?? "",
    width: img.naturalWidth || null,
    height: img.naturalHeight || null,
  }));

  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("a[href]"),
  );
  const host = window.location.hostname;
  let internal = 0;
  let external = 0;
  for (const link of links) {
    try {
      new URL(link.href).hostname === host ? internal++ : external++;
    } catch {
      internal++;
    }
  }

  const bodyText = document.body?.innerText ?? "";

  const ogTags: Record<string, string> = {};
  document
    .querySelectorAll<HTMLMetaElement>('meta[property^="og:"]')
    .forEach((el) => {
      ogTags[el.getAttribute("property")!] = el.content;
    });

  const twitterTags: Record<string, string> = {};
  document
    .querySelectorAll<HTMLMetaElement>('meta[name^="twitter:"]')
    .forEach((el) => {
      twitterTags[el.getAttribute("name")!] = el.content;
    });

  const paragraphs = Array.from(document.querySelectorAll("p"))
    .map((el) => el.textContent?.trim() ?? "")
    .filter(Boolean);

  const jsRes = Array.from(
    document.querySelectorAll<HTMLScriptElement>("script[src]"),
  )
    .map((el) => el.src)
    .filter(Boolean);

  const cssRes = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  )
    .map((el) => el.href)
    .filter(Boolean);

  const schemas = Array.from(
    document.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]',
    ),
  );
  const schemaTypes: string[] = [];
  for (const s of schemas) {
    try {
      const d = JSON.parse(s.textContent ?? "");
      if (d["@type"]) schemaTypes.push(d["@type"]);
    } catch {
      /* ignore invalid JSON-LD */
    }
  }

  return {
    url: window.location.href,
    title: document.title ?? "",
    metaDescription: getMetaContent("description"),
    metaKeywords: getMetaContent("keywords"),
    canonical:
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
      "",
    h1: getHeadings("h1"),
    h2: getHeadings("h2"),
    h3: getHeadings("h3"),
    h4: getHeadings("h4"),
    h5: getHeadings("h5"),
    h6: getHeadings("h6"),
    images,
    ogTags,
    twitterTags,
    wordCount: bodyText.split(/\s+/).filter(Boolean).length,
    internalLinks: internal,
    externalLinks: external,
    lang: document.documentElement.lang ?? "",
    paragraphs,
    resources: { js: jsRes, css: cssRes },
    schemaMarkup: { types: schemaTypes, count: schemas.length },
    ogImage: getMetaContent("og:image"),
    imageFileSizes: [],
  };
}
