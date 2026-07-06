import {
  BarcodeScannerScreenConfiguration,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function scanTinyBarcodes() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Enable locking the focus at the minimum possible distance.
  config.cameraConfiguration.minFocusDistanceLock = true;

  // Set the engine mode to 'NEXT_GEN_FAR_DISTANCE' to optimize for scanning tiny barcodes.
  config.scannerConfiguration.engineMode = 'NEXT_GEN_FAR_DISTANCE';

  // Configure other parameters as needed.

  try {
    const barcodeScanningResult = await ScanbotBarcode.startScanner(config);
  } catch (e) {
    console.error(e);
  }
}
