import { extractPageSEOData } from "./analyzer";
import { highlightIssues, clearHighlights } from "./highlighter";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "EXTRACT_SEO_DATA") {
    const data = extractPageSEOData();
    sendResponse({ data });
    return true;
  }

  if (message.type === "HIGHLIGHT_ISSUES") {
    highlightIssues();
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === "CLEAR_HIGHLIGHTS") {
    clearHighlights();
    sendResponse({ ok: true });
    return true;
  }
});
