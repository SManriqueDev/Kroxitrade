export { }

const TRADE_URL_PATTERN = /^https:\/\/www\.pathofexile\.com\/trade(?:\/|$)/i
const SIDEPANEL_PATH = "sidepanel.html"

const syncSidePanelForTab = async (tabId: number, url?: string) => {
  if (!chrome.sidePanel?.setOptions) {
    return
  }

  await chrome.sidePanel.setOptions({
    tabId,
    path: SIDEPANEL_PATH,
    enabled: !!url && TRADE_URL_PATTERN.test(url)
  })
}

const configureSidePanelBehavior = async () => {
  if (!chrome.sidePanel?.setPanelBehavior) {
    return
  }

  await chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })
}

chrome.runtime.onInstalled.addListener(() => {
  void configureSidePanelBehavior()
})

chrome.runtime.onStartup.addListener(() => {
  void configureSidePanelBehavior()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const nextUrl = changeInfo.url ?? tab.url
  if (!nextUrl) {
    return
  }

  void syncSidePanelForTab(tabId, nextUrl)
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
  void chrome.tabs.get(tabId).then((tab) => {
    void syncSidePanelForTab(tabId, tab.url)
  }).catch(() => undefined)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.query === "poe-ninja") {
    fetch(`https://poe.ninja/api${request.resource}`)
      .then(r => r.json())
      .then(sendResponse)
      .catch(() => sendResponse(null))
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
