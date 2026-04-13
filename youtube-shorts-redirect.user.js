// ==UserScript==
// @name         YouTube Shorts Redirect
// @namespace    https://github.com/vivanvv/yt-shorts-redirect
// @author       vivanvv
// @version      1.0
// @description  Redirect YouTube Shorts URLs to normal watch URLs.
// @match        https://www.youtube.com/*
// @homepageURL  https://github.com/vivanvv/yt-shorts-redirect
// @supportURL   https://github.com/vivanvv/yt-shorts-redirect/issues
// @downloadURL  https://raw.githubusercontent.com/vivanvv/yt-shorts-redirect/main/youtube-shorts-redirect.user.js
// @updateURL    https://raw.githubusercontent.com/vivanvv/yt-shorts-redirect/main/youtube-shorts-redirect.user.js
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  function redirectIfShorts() {
    const match = window.location.pathname.match(/^\/shorts\/([^/?#]+)/);
    if (!match) return;

    const videoId = match[1];
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL("/watch", currentUrl.origin);

    targetUrl.searchParams.set("v", videoId);

    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key !== "v") {
        targetUrl.searchParams.set(key, value);
      }
    }

    targetUrl.hash = currentUrl.hash;

    if (window.location.href !== targetUrl.href) {
      window.location.replace(targetUrl.href);
    }
  }

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    redirectIfShorts();
    return result;
  };

  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    redirectIfShorts();
    return result;
  };

  window.addEventListener("popstate", redirectIfShorts);
  window.addEventListener("yt-navigate-finish", redirectIfShorts);

  redirectIfShorts();
})();
