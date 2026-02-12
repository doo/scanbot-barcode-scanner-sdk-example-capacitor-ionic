import {
  BarcodeScannerScreenConfiguration,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function startBarcodeScanner() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // See further customization configs...

  const result = await ScanbotBarcode.startScanner(config);
}
