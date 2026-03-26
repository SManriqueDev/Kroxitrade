export { }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("[Kroxitrade-BG] Received message:", request.query, request);

  if (request.query === "poe-ninja") {
    fetch(`https://poe.ninja/api${request.resource}`)
      .then(r => r.json())
      .then(response => {
        console.log("[Kroxitrade-BG] Poe-ninja response relative to:", request.resource, "SUCCESS:", !!response);
        sendResponse(response);
      })
      .catch((err) => {
        console.error("[Kroxitrade-BG] Poe-ninja fetch failed:", err);
        sendResponse(null);
      })
    return true
  }

  if (request.query === "inject-trade-plus" && sender.tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      world: "MAIN",
      files: ["poe-trade-plus-main.js"] // Note: This will need to be correctly bundled by Plasmo
    }).then(() => sendResponse(true))
      .catch(() => sendResponse(false))
    return true
  }

})
