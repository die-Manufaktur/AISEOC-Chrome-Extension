import type { PageSEOData, ImageData } from "@/types/seo";

export async function fetchAndAnalyzePage(url: string): Promise<PageSEOData> {
  const res = await fetch(
    `/api/fetch-page?url=${encodeURIComponent(url)}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch page: ${res.statusText}`);

  const contentType = res.headers.get("content-type") ?? "";
  const rawText = await res.text();

  // The proxy now returns JSON errors instead of raw error strings
  if (contentType.includes("application/json")) {
    let errorData: { error?: string };
    try {
      errorData = JSON.parse(rawText);
    } catch {
      throw new Error("Unexpected response from proxy");
    }
    if (errorData.error) {
      throw new Error(errorData.error);
    }
  }

  const doc = new DOMParser().parseFromString(rawText, "text/html");
  const warnings: string[] = [];

  const getMetaContent = (name: string): string => {
    const el =
      doc.querySelector<HTMLMetaElement>(`meta[name="${name}"]`) ||
      doc.querySelector<HTMLMetaElement>(`meta[property="${name}"]`);
    return el?.content ?? "";
  };

  const getHeadings = (tag: string): string[] =>
    Array.from(doc.querySelectorAll(tag)).map(
      (el) => el.textContent?.trim() ?? "",
    );

  const images: ImageData[] = Array.from(
    doc.querySelectorAll<HTMLImageElement>("img"),
  ).map((img) => {
    let src = img.getAttribute("src") ?? "";
    if (src && !src.startsWith("http")) {
      try {
        src = new URL(src, url).href;
      } catch {
        // keep relative src as-is
      }
    }
    return {
      src,
      alt: img.getAttribute("alt") ?? "",
      width: null,
      height: null,
    };
  });

  const parsedUrl = new URL(url);
  const links = Array.from(doc.querySelectorAll<HTMLAnchorElement>("a[href]"));
  let internalLinks = 0;
  let externalLinks = 0;
  for (const link of links) {
    const href = link.getAttribute("href") ?? "";
    try {
      const linkUrl = new URL(href, url);
      if (linkUrl.hostname === parsedUrl.hostname) internalLinks++;
      else externalLinks++;
    } catch {
      internalLinks++;
    }
  }

  const bodyText = doc.body?.textContent ?? "";
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  // Detect JS-rendered sites: has <head> content but empty/minimal <body>
  const hasTitle = !!doc.title;
  const hasMetaTags =
    doc.querySelectorAll("meta[name], meta[property]").length > 0;
  const h1s = getHeadings("h1");
  const hasScripts = doc.querySelectorAll("script[src]").length > 0;

  if (
    (hasTitle || hasMetaTags) &&
    h1s.length === 0 &&
    wordCount < 50 &&
    hasScripts
  ) {
    warnings.push(
      "This page appears to be JavaScript-rendered. Content analysis may be incomplete because the dev mode proxy can only read the initial HTML — not content injected by JavaScript. For full results, use the Chrome extension on the live page.",
    );
    console.warn(
      `[fetch-page] JS-rendered site detected for ${url}: ` +
        `title="${doc.title}", meta tags=${hasMetaTags}, h1 count=${h1s.length}, ` +
        `word count=${wordCount}, script tags=${doc.querySelectorAll("script[src]").length}`,
    );
  } else if (h1s.length === 0 && wordCount < 20) {
    warnings.push(
      "Very little body content was found in the fetched HTML. The page may use JavaScript rendering, or the server may have returned an incomplete response.",
    );
    console.warn(
      `[fetch-page] Sparse body content for ${url}: ` +
        `h1 count=${h1s.length}, word count=${wordCount}`,
    );
  }

  const ogTags: Record<string, string> = {};
  doc
    .querySelectorAll<HTMLMetaElement>('meta[property^="og:"]')
    .forEach((el) => {
      const prop = el.getAttribute("property");
      if (prop) ogTags[prop] = el.content;
    });

  const twitterTags: Record<string, string> = {};
  doc
    .querySelectorAll<HTMLMetaElement>('meta[name^="twitter:"]')
    .forEach((el) => {
      const name = el.getAttribute("name");
      if (name) twitterTags[name] = el.content;
    });

  const canonical =
    doc.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute("href") ?? "";

  const paragraphs = Array.from(doc.querySelectorAll("p"))
    .map((el) => el.textContent?.trim() ?? "")
    .filter(Boolean);

  const jsResources = Array.from(doc.querySelectorAll<HTMLScriptElement>("script[src]"))
    .map((el) => el.getAttribute("src") ?? "")
    .filter(Boolean)
    .map((src) => {
      try { return new URL(src, url).href; } catch { return src; }
    });
  const cssResources = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .map((el) => el.getAttribute("href") ?? "")
    .filter(Boolean)
    .map((href) => {
      try { return new URL(href, url).href; } catch { return href; }
    });

  const schemaScripts = Array.from(
    doc.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
  );
  const schemaTypes: string[] = [];
  for (const script of schemaScripts) {
    try {
      const data = JSON.parse(script.textContent ?? "");
      if (data["@type"]) schemaTypes.push(data["@type"]);
    } catch {
      // invalid JSON-LD
    }
  }

  const ogImage = getMetaContent("og:image");

  return {
    url,
    title: doc.title ?? "",
    metaDescription: getMetaContent("description"),
    metaKeywords: getMetaContent("keywords"),
    canonical,
    h1: h1s,
    h2: getHeadings("h2"),
    h3: getHeadings("h3"),
    h4: getHeadings("h4"),
    h5: getHeadings("h5"),
    h6: getHeadings("h6"),
    images,
    ogTags,
    twitterTags,
    wordCount,
    internalLinks,
    externalLinks,
    lang: doc.documentElement?.getAttribute("lang") ?? "",
    paragraphs,
    resources: { js: jsResources, css: cssResources },
    schemaMarkup: { types: schemaTypes, count: schemaScripts.length },
    ogImage,
    imageFileSizes: [],
    fetchWarnings: warnings.length > 0 ? warnings : undefined,
  };
}
