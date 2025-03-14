
![Scanbot SDK Logo](.images/ScanbotSDKLogo.png)

# Example App for the Scanbot Capacitor Barcode Scanner SDK with the Ionic framework

This example app demonstrates how to integrate the Scanbot Barcode Scanner SDK into your Capacitor app.

## What is the Scanbot Barcode Scanner SDK?

The Scanbot [Barcode Scanner SDK](https://scanbot.io/barcode-scanner-sdk/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) is a simple and intuitive plugin that allows you to turn smartphones into fast and reliable barcode scanners.

It operates entirely offline on the user's device and takes only 0.04 seconds to scan barcodes. Scans are accurate even under challenging conditions, including damaged, small, or distant barcodes and low-light environments.

The plugin can be integrated into your app within minutes and comes with Ready-To-Use UI components, which allow you to customize the barcode scanner to your needs.

💡 For more details about the Scanbot Barcode Scanner SDK for Capacitor, please check out our [documentation](https://docs.scanbot.io/barcode-scanner-sdk/capacitor/introduction/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites).

## Requirements

* NodeJS 18+ & npm
* [Capacitor CLI](https://www.npmjs.com/package/@capacitor/cli) 6+
* For Android apps:
	* Android Studio Hedgehog | 2023.1.1+
	* Android SDK (API Level 22+), Platforms and Developer Tools

* For iOS apps:
	* iOS 13+
	* macOS with Xcode 15+
	* Xcode Command Line Tools
	* Homebrew
	* Cocoapods

Please check the full [requirements for Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup).

## How to run the example app

### Step 1: Install

Install the node modules of this project:

```
npm install
```

### Step 2: Build

Build the web assets and sync with the Capacitor native projects:

```
npm run build
npm run sync
```

### Step 3: Run

Connect an Android or iOS device via USB and run the app by opening the respective projects, or via the terminal with these commands:

```
npm run android
```

```
npm run ios
```

You can read more about the Capacitor CLI commands at this [link](https://capacitorjs.com/docs/cli).

If you want to develop without Capacitor CLI commands, you can use [VS Code](https://code.visualstudio.com/) together with the [Ionic VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ionic.ionic). Read more about this [here](https://capacitorjs.com/docs/vscode/getting-started).

**Note:** Please make sure that you have configured the camera permissions accordingly.

## Features of the Capacitor Barcode Scanner SDK

### Out-of-the-box barcode scanning workflows

The Scanbot Barcode Scanner SDK offers the following scan modes right out of the box in our ready-to-use UI:

#### Single Scanning

This is the Barcode Scanner SDK's default scanning mode. It is optimized for detecting a single barcode and is easily configurable to your needs. You can show a confirmation screen that displays detected barcode data.

#### Batch & Multi Scanning

The barcode scanner can also be configured to scan multiple barcodes in succession (without closing the scanning screen every time), to capture multiple barcodes from the camera view at once, or to count the scanned items.

#### Find & Pick

Given one or more barcodes, the Barcode Scanner SDK will visually highlight and scan the correct items for your users. It automatically selects the barcode with the right barcode value from your camera feed. 

| ![Batch Scanning](.images/batch-scanning.png) | ![Multi Scanning](.images/multi-scanning.png) | ![Find and Pick](.images/find-pick.png) |
| :-- | :-- | :-- |

### AR Overlay

The Scanbot Capacitor Barcode Scanner plugin includes an optional AR Overlay for all scanning modes. It provides real-time barcode highlighting, preview, and tap-to-select functionalities. This can, for example, be used to display in-view error messages.

Recognized barcodes are highlighted with a customizable frame and text, clearly distinguishing scanned from unscanned items. Users can select barcodes manually by tapping or instead rely on automatic selection.

### Scanning barcodes from an image

The Scanbot Barcode Scanner SDK also supports still images, enabling barcode scanning from JPG and other image files. It supports single-image and multi-image detection and returns a list with the recognized barcodes.

### Supported barcodes

The Scanbot Capacitor barcode scanner library supports all common 1D- or 2D barcode formats, such as QR codes, or Aztec Codes, as well as multiple postal symbologies, including:

| Barcode type       | Barcode symbologies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|:-------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1D Barcodes        | [EAN](https://scanbot.io/barcode-scanner-sdk/ean/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_site), [UPC](https://scanbot.io/barcode-scanner-sdk/upc/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Code 128](https://scanbot.io/barcode-scanner-sdk/code-128/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [GS1-128](https://scanbot.io/barcode-scanner-sdk/gs1-128/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Code 39](https://scanbot.io/barcode-scanner-sdk/code-39/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Codabar](https://scanbot.io/barcode-scanner-sdk/codabar/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [ITF](https://scanbot.io/barcode-scanner-sdk/itf-code/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), Code 25, Code 32, Code 93, Code 11, MSI Plessey, Standard 2 of 5, IATA 2 of 5, Databar (RSS), GS1 Composite                                                                                                                                                                                                                                                                                                                        |
| 2D Barcodes        | [QR Code](https://scanbot.io/glossary/qr-code/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Micro QR Code](https://scanbot.io/barcode-scanner-sdk/micro-qr-code/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Aztec Code](https://scanbot.io/barcode-scanner-sdk/aztec-code/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [PDF417 Code](https://scanbot.io/barcode-scanner-sdk/pdf417/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Data Matrix Code,](https://scanbot.io/barcode-scanner-sdk/data-matrix/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) [GiroCode](https://scanbot.io/glossary/giro-code/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [NTIN Code](https://scanbot.io/glossary/gtin/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [PPN](https://scanbot.io/glossary/ppn/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [UDI](https://scanbot.io/glossary/udi/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [Royal Mail Mailmark](https://scanbot.io/barcode-scanner-sdk/royal-mail/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), MaxiCode |
| Postal Symbologies | USPS Intelligent Mail (IMb), Royal Mail RM4SCC Barcode, Australia Post 4-State Customer Code, Japan Post 4-State Customer Code, KIX                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

💡 Please visit our [docs](https://docs.scanbot.io/barcode-scanner-sdk/capacitor/supported-barcodes/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) for a complete overview of the supported barcode symbologies.

## Additional information

### Guides and Tutorials

Integrating the Scanbot Capacitor Barcode Scanner plugin into your Capacitor app takes just a few minutes, and our step-by-step guides make the process even easier.

💡 Our [Ionic Capacitor Barcode Scanner tutorial](https://scanbot.io/techblog/ionic-capacitor-barcode-scanner-tutorial/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) walks you through the integration process step by step. Follow along to implement a powerful barcode scanning feature quickly.

Alternatively, check out our [developer blog](https://scanbot.io/techblog/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) for a collection of in-depth tutorials, use cases, and best practices.

### Free integration support

Need help integrating or testing our Barcode Scanner SDK? We offer [free developer support](https://docs.scanbot.io/support/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) via Slack, MS Teams, or email.

As a customer, you also get access to a dedicated support Slack or Microsoft Teams channel to talk directly to your Customer Success Manager and our engineers.

### Licensing and pricing

The barcode scanner example app will run for one minute per session without a license. After that, all functionalities and UI components will stop working. 

To try the Barcode Scanner without the one-minute limit, you can request a free, no-strings-attached [7-day trial license](https://scanbot.io/trial/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites).

Our pricing model is simple: Unlimited barcode scanning for a flat annual license fee, full support included. There are no tiers, usage charges, or extra fees. [Contact](https://scanbot.io/contact-sales/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) our team to receive your quote.

### Other supported platforms

Besides Capacitor, the Scanbot Barcode Scanner SDK is also available on:

* [Android (native)](https://github.com/doo/scanbot-barcode-scanner-sdk-example-android)
* [iOS (native)](https://github.com/doo/scanbot-barcode-scanner-sdk-example-ios)
* [JavaScript (web)](https://github.com/doo/scanbot-barcode-scanner-sdk-example-web)
* [React Native](https://github.com/doo/scanbot-barcode-scanner-sdk-example-react-native)
* [Flutter](https://github.com/doo/scanbot-barcode-scanner-sdk-example-flutter)
* [Cordova & Ionic](https://github.com/doo/scanbot-barcode-scanner-sdk-example-cordova-ionic)
* [.NET MAUI](https://github.com/doo/scanbot-barcode-sdk-maui-example)
* [Compose Multiplatform / KMP](https://github.com/doo/scanbot-barcode-scanner-sdk-example-kmp)
* [Xamarin & Xamarin.Forms](https://github.com/doo/scanbot-barcode-scanner-sdk-example-xamarin)
* [UWP](https://github.com/doo/scanbot-barcode-scanner-sdk-example-windows)
* [Linux](https://github.com/doo/scanbot-sdk-example-linux)