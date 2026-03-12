import type { PageSEOData, ImageData } from "@/types/seo";

export function extractPageSEOData(): PageSEOData {
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

  const images: ImageData[] = Array.from(
    document.querySelectorAll<HTMLImageElement>("img"),
  ).map((img) => ({
    src: img.src,
    alt: img.alt ?? "",
    width: img.naturalWidth || null,
    height: img.naturalHeight || null,
  }));

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"));
  const currentHost = window.location.hostname;
  let internalLinks = 0;
  let externalLinks = 0;
  for (const link of links) {
    try {
      const url = new URL(link.href);
      if (url.hostname === currentHost) internalLinks++;
      else externalLinks++;
    } catch {
      internalLinks++;
    }
  }

  const bodyText = document.body?.innerText ?? "";
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  const ogTags: Record<string, string> = {};
  document.querySelectorAll<HTMLMetaElement>('meta[property^="og:"]').forEach((el) => {
    ogTags[el.getAttribute("property")!] = el.content;
  });

  const twitterTags: Record<string, string> = {};
  document.querySelectorAll<HTMLMetaElement>('meta[name^="twitter:"]').forEach((el) => {
    twitterTags[el.getAttribute("name")!] = el.content;
  });

  const canonical =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "";

  const paragraphs = Array.from(document.querySelectorAll("p")).map(
    (el) => el.textContent?.trim() ?? "",
  ).filter(Boolean);

  const jsResources = Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]"))
    .map((el) => el.src)
    .filter(Boolean);
  const cssResources = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .map((el) => el.href)
    .filter(Boolean);

  const schemaScripts = Array.from(
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
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
    url: window.location.href,
    title: document.title ?? "",
    metaDescription: getMetaContent("description"),
    metaKeywords: getMetaContent("keywords"),
    canonical,
    h1: getHeadings("h1"),
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
    lang: document.documentElement.lang ?? "",
    paragraphs,
    resources: { js: jsResources, css: cssResources },
    schemaMarkup: { types: schemaTypes, count: schemaScripts.length },
    ogImage,
    imageFileSizes: [],
  };
}
