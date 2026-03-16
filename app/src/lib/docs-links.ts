const BASE_URL = "https://ai-seo-copilot.gitbook.io/ai-seo-copilot/documentation";

const CHECK_URLS: Record<string, string> = {
  "Page has a title tag": `${BASE_URL}/meta-seo/keyphrase-in-title`,
  "Title length is optimal (50-60 characters)": `${BASE_URL}/meta-seo/keyphrase-in-title`,
  "Title contains target keyword": `${BASE_URL}/meta-seo/keyphrase-in-title`,
  "Page has a meta description": `${BASE_URL}/meta-seo/keyphrase-in-meta-description`,
  "Meta description length is optimal (120-155 characters)": `${BASE_URL}/meta-seo/keyphrase-in-meta-description`,
  "Meta description contains target keyword": `${BASE_URL}/meta-seo/keyphrase-in-meta-description`,
  "URL contains target keyword": `${BASE_URL}/meta-seo/keyphrase-in-url`,
  "Page has an H1 heading": `${BASE_URL}/content-optimization/keyphrase-in-h1-heading`,
  "H1 contains target keyword": `${BASE_URL}/content-optimization/keyphrase-in-h1-heading`,
  "Heading hierarchy is correct": `${BASE_URL}/content-optimization/heading-hierarchy`,
  "Keyphrase density is optimal (0.5%-2.5%)": `${BASE_URL}/content-optimization/keyphrase-density`,
  "Keyphrase appears in introduction": `${BASE_URL}/content-optimization/keyphrase-in-introduction`,
  "H2 headings contain target keyword": `${BASE_URL}/content-optimization/keyphrase-in-h2-headings`,
  "Page has internal links": `${BASE_URL}/links/internal-links`,
  "Page has outbound links": `${BASE_URL}/links/outbound-links`,
  "All images have alt text": `${BASE_URL}/images/image-alt-attributes`,
  "Images use next-gen formats (WebP/AVIF)": `${BASE_URL}/images/next-gen-image-formats`,
  "Images are under 500KB": `${BASE_URL}/images/image-file-size`,
  "Open Graph image is set": `${BASE_URL}/images/opengraph-image`,
  "Open Graph title and description are present": `${BASE_URL}/meta-seo/open-graph-title-and-description`,
  "Schema markup is present": `${BASE_URL}/tech-seo/schema-markup`,
  "Code is minified": `${BASE_URL}/tech-seo/code-minification`,
};

export function getLearnMoreUrl(checkTitle: string): string {
  return CHECK_URLS[checkTitle] || `${BASE_URL}/seo-optimization-guide`;
}
