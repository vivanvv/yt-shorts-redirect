// ==UserScript==
// @name         YouTube Shorts Redirect
// @namespace    https://github.com/vivanvv/yt-shorts-redirect
// @author       vivanvv
// @version      1.0.2
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

  function getRedirectUrl() {
    const currentUrl = new URL(window.location.href);
    const match = currentUrl.pathname.match(/^\/shorts\/([^/?#]+)/);
    if (!match) return null;

    const videoId = match[1];
    const targetUrl = new URL("/watch", currentUrl.origin);

    targetUrl.searchParams.set("v", videoId);

    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key !== "v") {
        targetUrl.searchParams.set(key, value);
      }
    }

    targetUrl.hash = currentUrl.hash;
    return targetUrl.href;
  }

  function redirectIfShorts() {
    const targetUrl = getRedirectUrl();
    if (!targetUrl || window.location.href === targetUrl) return;

    window.location.replace(targetUrl);
  }

  let lastHref = window.location.href;

  function handleUrlChange() {
    const currentHref = window.location.href;
    if (currentHref === lastHref) return;
    lastHref = currentHref;
    redirectIfShorts();
  }

  window.addEventListener("popstate", handleUrlChange, true);
  window.addEventListener("hashchange", handleUrlChange, true);
  window.addEventListener("yt-navigate-start", handleUrlChange, true);
  window.addEventListener("yt-navigate-finish", handleUrlChange, true);
  window.addEventListener("pageshow", handleUrlChange, true);

  setInterval(handleUrlChange, 250);
  redirectIfShorts();
})();
