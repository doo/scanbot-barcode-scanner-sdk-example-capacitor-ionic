import {
  ScanbotBarcodeSDK,
  BarcodeScannerScreenConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function statRtuUiV2WithUserGuidanceConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Hide/show the user guidance.
  config.userGuidance.visible = true;

  // Configure the title.
  config.userGuidance.title.text = 'Move the finder over a barcode';
  config.userGuidance.title.color = '#FFFFFF';

  // Configure the background.
  config.userGuidance.background.fillColor = '#0000007A';

  // Configure other parameters as needed.

  const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);
}
