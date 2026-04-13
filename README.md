# yt-shorts-redirect

Chrome extension that redirects YouTube Shorts URLs to the normal `watch` page.

## Files

- `manifest.json`: Extension config and permissions.
- `background.js`: Background service worker that watches YouTube navigations and redirects Shorts URLs.

## Load locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this repository folder.

## How it works

The extension listens for YouTube navigations at the browser level:

- `onCommitted` for normal page loads.
- `onHistoryStateUpdated` for in-page YouTube SPA navigations.

When the URL matches `/shorts/<videoId>`, it redirects the tab to `/watch?v=<videoId>` and preserves any existing query params and hash.
