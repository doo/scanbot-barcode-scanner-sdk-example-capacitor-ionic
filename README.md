# Scanbot Barcode Scanner SDK Example App for Capacitor
This example app demonstrate how to integrate the [Scanbot Barcode Scanner SDK for Capacitor](https://docs.scanbot.io/barcode-scanner-sdk/capacitor/) for Android and iOS.


## What is the Scanbot Barcode Scanner SDK?

Scanbot Barcode Scanner SDK is a simple to use high level API, providing a collection of classes and functions for scanning and parsing 1D and 2D barcodes from your mobile device's camera or other image sources like your photo library.

The SDK for Capacitor is available as an npm package:
- https://www.npmjs.com/package/capacitor-plugin-scanbot-barcode-scanner-sdk

## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To test the Scanbot SDK without crashing, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).


## Supported Barcode Types

- [1D Barcodes](https://scanbot.io/products/barcode-software/1d-barcode-scanner/): [Codabar](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/codabar), [Code 39](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/code-39), [Code 93](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-93/), [Code 128](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-128/), [IATA 2 of 5](https://scanbot.io/products/barcode-software/1d-barcode-scanner/standard-2-of-5/), [Industrial 2 of 5](https://scanbot.io/products/barcode-software/1d-barcode-scanner/industrial-2-of-5/), [ITF](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/itf), [EAN-8](https://scanbot.io/products/barcode-software/1d-barcode-scanner/ean-8), [EAN-13](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/ean-code), [MSI Plessey](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/msi-plessey), [RSS 14](https://scanbot.io/products/barcode-software/1d-barcode-scanner/gs1-databar/), [RSS Expanded (Databar)](https://scanbot.io/products/barcode-software/1d-barcode-scanner/rss-expanded/), [UPC-A](https://scanbot.io/products/barcode-software/1d-barcode-scanner/upc/), [UPC-E](https://scanbot.io/products/barcode-software/1d-barcode-scanner/upc-e/), [Code 25](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-25/), [USPS Intelligent Mail](https://scanbot.io/products/barcode-software/1d-barcode-scanner/intelligent-mail-barcode/), [RM4SCC](https://scanbot.io/products/barcode-software/1d-barcode-scanner/rm4scc/), [Japan Post 4-State](https://scanbot.io/products/barcode-software/1d-barcode-scanner/japan-post-4-state-customer-code/), [Australia Post 4-State](https://scanbot.io/products/barcode-software/1d-barcode-scanner/australia-post-4-state-customer-code/), [KIX](https://scanbot.io/products/barcode-software/1d-barcode-scanner/kix/), RSS Limited (Databar), GS1 Composite.
- [2D Barcodes](https://scanbot.io/products/barcode-software/2d-barcode-scanner/): [Aztec](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/aztec), [Data Matrix](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/datamatrix), [PDF417](https://scanbot.io/products/barcode-software/2d-barcode-scanner/pdf417/), [QR Code](https://scanbot.io/products/barcode-software/2d-barcode-scanner/qr-code/), [Micro QR Code](https://scanbot.io/products/barcode-software/2d-barcode-scanner/micro-qr-code/).

💡 Also check out our blog post [Types of barcodes](https://scanbot.io/blog/types-of-barcodes/).


## Supported Data Parsers:

- [AAMVA](https://scanbot.io/blog/drivers-license-barcode-parser/): Parse the AAMVA data format from PDF-417 barcodes on US driver's licenses.
- Boarding pass data from PDF417 barcodes.
- Parser for German Medical Certificates (aka. Disability Certificate or AU-Bescheinigung) coded in a PDF-417 barcode.
- [GS1](https://scanbot.io/products/barcode-software/1d-barcode-scanner/gs1-databar/) encoded data from barcodes.
- Data from PDF-417 barcodes on ID Cards.
- Parse and extract data from XML of Data Matrix barcodes on Medical Plans (German Medikationsplan).
- Data parser of QR-Code values printed on SEPA pay forms.
- vCard data from a QR-Code (e.g. on business cards).
- [Swiss QR](https://scanbot.io/products/barcode-software/2d-barcode-scanner/swiss-qr/) data from a QR-Code for easy, automatic and efficient payments.

For more details please refer to the SDK documentation.


## Documentation

For more details about the Scanbot Barcode Scanner SDK for Capacitor please see this
[documentation](https://docs.scanbot.io/barcode-scanner-sdk/capacitor/).

## How to run this app

### Requirements

- NodeJS 18+ & npm
- [Capacitor CLI](https://www.npmjs.com/package/@capacitor/cli) 6+
- For Android apps:
    * Android Studio Hedgehog | 2023.1.1+
    * Android SDK (API Level 22+), Platforms and Developer Tools
- For iOS apps: 
    * iOS 13+
    * macOS with Xcode 15+
    * Xcode Command Line Tools
    * Homebrew
    * Cocoapods

Please check the full [requirements for Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup).

### Install

Install the node modules of this project:

```
npm install
```

### Build

Build the web assets and sync with the Capacitor native projects:

```
npm run build
npm run sync
```

### Run

Connect an Android or iOS device via USB and run the app by opening the respective projects, or via terminal with these commands:

```
npm run android
```

```
npm run ios
```

You can read more about the Capacitor CLI commands at this [link](https://capacitorjs.com/docs/cli).

If you want to develop without Capacitor CLI commands, you can use [VS Code](https://code.visualstudio.com/) together with the [Ionic VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ionic.ionic). Read more about this [here](https://capacitorjs.com/docs/vscode/getting-started).
