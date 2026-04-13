# yt-shorts-redirect

Chrome extension that redirects YouTube Shorts URLs to the normal `watch` page.

## Files

- `manifest.json`: Extension config and permissions.
- `background.js`: Background service worker that watches YouTube navigations and redirects Shorts URLs.
- `icons/`: Extension icons used by Chrome and the Chrome Web Store.
- `scripts/package.sh`: Creates the upload ZIP for the Chrome Web Store.
- `store/listing.md`: Draft store copy and submission notes.

## Load locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this repository folder.

## Package for upload

Run:

```sh
./scripts/package.sh
```

This creates a release ZIP in `dist/` with `manifest.json` at the root, ready for Chrome Web Store upload.

## How it works

The extension listens for YouTube navigations at the browser level:

- `onCommitted` for normal page loads.
- `onHistoryStateUpdated` for in-page YouTube SPA navigations.

When a `https://www.youtube.com/shorts/<videoId>` URL is visited, it redirects the tab to `https://www.youtube.com/watch?v=<videoId>` and preserves any existing query params and hash.

## Publish checklist

1. Load the extension locally and test it.
2. Run `./scripts/package.sh`.
3. Upload the generated ZIP in the Chrome Web Store dashboard.
4. Fill in the listing/privacy fields using `store/listing.md` as a draft.
5. Add at least one store screenshot.
6. Submit for review.
