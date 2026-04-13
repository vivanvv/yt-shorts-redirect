"use strict";

const URL_FILTERS = {
  url: [
    {
      hostEquals: "www.youtube.com",
      pathPrefix: "/shorts/",
      schemes: ["https"]
    }
  ]
};

function getRedirectUrl(rawUrl) {
  const currentUrl = new URL(rawUrl);
  const match = currentUrl.pathname.match(/^\/shorts\/([^/?#]+)/);
  if (!match) {
    return null;
  }

  const videoId = match[1];
  const targetUrl = new URL("/watch", "https://www.youtube.com");
  targetUrl.searchParams.set("v", videoId);

  for (const [key, value] of currentUrl.searchParams.entries()) {
    if (key !== "v") {
      targetUrl.searchParams.set(key, value);
    }
  }

  targetUrl.hash = currentUrl.hash;
  return targetUrl.href;
}

async function redirectShortsTab(tabId, rawUrl) {
  const targetUrl = getRedirectUrl(rawUrl);
  if (!targetUrl || targetUrl === rawUrl) {
    return;
  }

  await chrome.tabs.update(tabId, { url: targetUrl });
}

function handleNavigation(details) {
  if (details.frameId !== 0) {
    return;
  }

  redirectShortsTab(details.tabId, details.url).catch((error) => {
    console.error("Failed to redirect YouTube Shorts URL.", error);
  });
}

chrome.webNavigation.onCommitted.addListener(handleNavigation, URL_FILTERS);
chrome.webNavigation.onHistoryStateUpdated.addListener(
  handleNavigation,
  URL_FILTERS
);
