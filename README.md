# Quick Barcode Generator

Very simple app to generate and display QR code and various types of barcodes.

Can be called from commandline as:

```
quick-barcode-generator --type=[barcode-type] data
quick-barcode-generator --type=code128b 1234567890
```

## Tauri

Based on Tauri, see https://tauri.app/ .

## Getting Started

```
nvm use
corepack enable
yarn install --immutable
yarn tauri dev
yarn tauri build
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## License

MIT
