# yt-shorts-redirect

A small Chrome extension that turns YouTube Shorts URLs into standard YouTube watch URLs.

If you open a link like:

```text
https://www.youtube.com/shorts/<videoId>
```

the extension redirects it to:

```text
https://www.youtube.com/watch?v=<videoId>
```

Query parameters and URL fragments are preserved where possible.

## Why use it

- Opens Shorts in the normal YouTube player
- Works with direct page loads and YouTube's in-app navigation
- Keeps the extension lightweight and focused on one job

## Install locally

This repository can be loaded directly as an unpacked Chrome extension:

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this repository folder

## How it works

The extension uses a Manifest V3 background service worker to watch YouTube navigations and redirect Shorts URLs before you continue browsing.

It listens for:

- `webNavigation.onCommitted` for full page navigations
- `webNavigation.onHistoryStateUpdated` for YouTube's single-page app route changes

The redirect logic lives in `background.js`.

## Project structure

- `manifest.json`: Chrome extension manifest
- `background.js`: Redirect logic
- `icons/`: Extension icons
- `scripts/package.sh`: Creates a ZIP ready for Chrome Web Store upload

## Development

To create a packaged build for distribution:

```sh
./scripts/package.sh
```

This creates a ZIP in `dist/` with the extension files at the archive root.

## Privacy

This extension is intentionally minimal:

- No authentication
- No remote code
- No analytics or tracking
- No data collection in the current implementation

## License

[MIT](LICENSE)
