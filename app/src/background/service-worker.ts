// Let Chrome handle opening the panel on icon click — only reliable way to avoid gesture errors
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Track which tabs have the panel open for per-tab scoping
const panelTabs = new Set<number>();

// When the user switches tabs, hide the panel unless it was opened on that tab.
// Only start scoping after the panel has been opened at least once — otherwise
// the first click after install/reload would be blocked (chicken-and-egg bug).
chrome.tabs.onActivated.addListener(({ tabId }) => {
  if (panelTabs.size === 0) return;
  if (panelTabs.has(tabId)) {
    chrome.sidePanel.setOptions({ tabId, enabled: true });
  } else {
    chrome.sidePanel.setOptions({ tabId, enabled: false });
  }
});

// Clean up when tabs close
chrome.tabs.onRemoved.addListener((tabId) => {
  panelTabs.delete(tabId);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  // Side panel reports which tab it opened on
  if (message.type === "PANEL_OPENED") {
    if (message.tabId) panelTabs.add(message.tabId);
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === "GET_ACTIVE_TAB") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] });
    });
    return true;
  }

  if (message.type === "EXECUTE_CONTENT_SCRIPT") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) {
        sendResponse({ error: "No active tab" });
        return;
      }

      try {
        const results = await chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            return true;
          },
        });
        sendResponse({ results });
      } catch (error) {
        sendResponse({ error: String(error) });
      }
    });
    return true;
  }

  // Inject content script if not already present, then extract SEO data
  if (message.type === "EXTRACT_PAGE_DATA") {
    const tabId = message.tabId as number;
    (async () => {
      try {
        // First try to reach the existing content script
        const existing = await new Promise<{ data?: unknown; error?: string }>((resolve) => {
          const timer = setTimeout(() => resolve({ error: "timeout" }), 2000);
          chrome.tabs.sendMessage(tabId, { type: "EXTRACT_SEO_DATA" }, (resp) => {
            clearTimeout(timer);
            if (chrome.runtime.lastError) {
              resolve({ error: chrome.runtime.lastError.message });
            } else {
              resolve(resp ?? { error: "no response" });
            }
          });
        });

        if (existing.data) {
          sendResponse(existing);
          return;
        }

        // Content script not available — inject the analyzer directly
        const results = await chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
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
            const images = Array.from(document.querySelectorAll<HTMLImageElement>("img")).map((img) => ({
              src: img.src, alt: img.alt ?? "", width: img.naturalWidth || null, height: img.naturalHeight || null,
            }));
            const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"));
            const host = window.location.hostname;
            let internal = 0, external = 0;
            for (const link of links) {
              try { new URL(link.href).hostname === host ? internal++ : external++; }
              catch { internal++; }
            }
            const bodyText = document.body?.innerText ?? "";
            const ogTags: Record<string, string> = {};
            document.querySelectorAll<HTMLMetaElement>('meta[property^="og:"]').forEach((el) => {
              ogTags[el.getAttribute("property")!] = el.content;
            });
            const twitterTags: Record<string, string> = {};
            document.querySelectorAll<HTMLMetaElement>('meta[name^="twitter:"]').forEach((el) => {
              twitterTags[el.getAttribute("name")!] = el.content;
            });
            const paragraphs = Array.from(document.querySelectorAll("p"))
              .map((el) => el.textContent?.trim() ?? "").filter(Boolean);
            const jsRes = Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]"))
              .map((el) => el.src).filter(Boolean);
            const cssRes = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
              .map((el) => el.href).filter(Boolean);
            const schemas = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'));
            const schemaTypes: string[] = [];
            for (const s of schemas) { try { const d = JSON.parse(s.textContent ?? ""); if (d["@type"]) schemaTypes.push(d["@type"]); } catch {} }
            return {
              url: window.location.href, title: document.title ?? "",
              metaDescription: getMetaContent("description"), metaKeywords: getMetaContent("keywords"),
              canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
              h1: getHeadings("h1"), h2: getHeadings("h2"), h3: getHeadings("h3"),
              h4: getHeadings("h4"), h5: getHeadings("h5"), h6: getHeadings("h6"),
              images, ogTags, twitterTags, wordCount: bodyText.split(/\s+/).filter(Boolean).length,
              internalLinks: internal, externalLinks: external,
              lang: document.documentElement.lang ?? "", paragraphs,
              resources: { js: jsRes, css: cssRes },
              schemaMarkup: { types: schemaTypes, count: schemas.length },
              ogImage: getMetaContent("og:image"), imageFileSizes: [],
            };
          },
        });
        const data = results?.[0]?.result;
        if (data) {
          sendResponse({ data });
        } else {
          sendResponse({ error: "Failed to extract page data" });
        }
      } catch (error) {
        sendResponse({ error: String(error) });
      }
    })();
    return true;
  }

  if (message.type === "SEND_TO_CONTENT") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) {
        sendResponse({ error: "No active tab" });
        return;
      }
      chrome.tabs.sendMessage(tabId, message.payload, (response) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: chrome.runtime.lastError.message });
          return;
        }
        sendResponse(response);
      });
    });
    return true;
  }
});
