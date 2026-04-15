# YouTube Shorts Redirect

A super small browser extension for Chrome and other Chromium-based browsers that redirects YouTube Shorts links from their native player to the standard YouTube video watch mode.

Useful if you want to watch a specific short without doomscrolling afterwards. 


## Behaviour

The extension (currently) has only one behaviour. It redirects links of the form:

```text
https://www.youtube.com/shorts/<videoId>
```

to:

```text
https://www.youtube.com/watch?v=<videoId>
```


## Install via the Chrome Web Store

[YouTube Shorts Redirect](https://chromewebstore.google.com/detail/youtube-shorts-redirect/abnmjlhlkencbjhjhehlmefonnkbmmeb)

1. Open the Chrome Web Store listing
2. Click `Get` > `Add extension`


## Install locally

The repository can be loaded directly as an unpacked Chrome extension:

1. Click the green `Code` button then `Download ZIP`
2. Unzip the folder in your file manager
3. Open `chrome://extensions` in your browser
4. Enable the `Developer mode` toggle
5. Click the `Load unpacked` button
6. Select the repository folder you just unzipped


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

The extension is intentionally minimal:

- No authentication
- No remote code
- No analytics or tracking
- No data collection in the current implementation


## License

[MIT](LICENSE)
