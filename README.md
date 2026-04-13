# yt-shorts-redirect

A micro Chrome extension that opens an individual YouTube Short in standard watch mode instead of the Shorts viewer.

Useful if you want to watch a specific short but don't want to continuously doomscroll afterwards. 


## Behaviour

The extension (currently) has one behaviour which is redirecting links that match:

```text
https://www.youtube.com/shorts/<videoId>
```

into:

```text
https://www.youtube.com/watch?v=<videoId>
```


## Install locally

This repository can be loaded directly as an unpacked Chrome extension:

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this repository folder


## Methodology

The extension uses a Manifest V3 background service worker to watch YouTube navigations and redirect Shorts URLs before you continue browsing.

It listens for:

- `webNavigation.onCommitted` for full page navigations
- `webNavigation.onHistoryStateUpdated` for YouTube's single-page app route changes

When it sees a URL in the form:

```text
https://www.youtube.com/shorts/<videoId>
```

it converts it to:

```text
https://www.youtube.com/watch?v=<videoId>
```

The redirect logic lives in `background.js`, and existing query parameters and URL fragments are preserved where possible.


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
