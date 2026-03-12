chrome.action.onClicked.addListener((_tab) => {
  chrome.sidePanel.setOptions({ enabled: true });
  chrome.sidePanel.open({ windowId: _tab.windowId! });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
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
            // This will use the already-injected content script
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

  if (message.type === "SEND_TO_CONTENT") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) {
        sendResponse({ error: "No active tab" });
        return;
      }
      chrome.tabs.sendMessage(tabId, message.payload, (response) => {
        sendResponse(response);
      });
    });
    return true;
  }
});
