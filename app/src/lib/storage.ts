const isChromeExtension =
  typeof chrome !== "undefined" && chrome.storage !== undefined;

export async function getStorageItem<T>(key: string): Promise<T | null> {
  if (isChromeExtension) {
    const result = await chrome.storage.local.get(key);
    return (result[key] as T) ?? null;
  }
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  if (isChromeExtension) {
    await chrome.storage.local.set({ [key]: value });
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export async function removeStorageItem(key: string): Promise<void> {
  if (isChromeExtension) {
    await chrome.storage.local.remove(key);
    return;
  }
  localStorage.removeItem(key);
}

// Keyword persistence per URL
export async function saveKeywordForUrl(url: string, keyword: string): Promise<void> {
  const map = (await getStorageItem<Record<string, string>>("url_keywords")) ?? {};
  const host = new URL(url).hostname;
  map[host] = keyword;
  await setStorageItem("url_keywords", map);
}

export async function getKeywordForUrl(url: string): Promise<string | null> {
  const map = await getStorageItem<Record<string, string>>("url_keywords");
  if (!map) return null;
  const host = new URL(url).hostname;
  return map[host] ?? null;
}

// Advanced options persistence per site
interface SavedAdvancedOptions {
  pageType: string;
  secondaryKeywords: string;
  language: string;
}

export async function saveAdvancedOptions(
  siteHost: string,
  options: SavedAdvancedOptions,
): Promise<void> {
  const map = (await getStorageItem<Record<string, SavedAdvancedOptions>>("site_options")) ?? {};
  map[siteHost] = options;
  await setStorageItem("site_options", map);
}

export async function getAdvancedOptions(
  siteHost: string,
): Promise<SavedAdvancedOptions | null> {
  const map = await getStorageItem<Record<string, SavedAdvancedOptions>>("site_options");
  if (!map) return null;
  return map[siteHost] ?? null;
}
