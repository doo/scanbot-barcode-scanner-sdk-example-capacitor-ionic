import {
  BarcodeScannerScreenConfiguration,
  ScanbotBarcode,
  ScanbotBarcodeSDK,
  SingleScanningMode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function startSingleBarcodeScan() {
  try {
    /** Check license status and return early if the license is not valid */
    if (!(await ScanbotBarcodeSDK.getLicenseInfo()).isValid) {
      return;
    }
    /**
     * Instantiate a configuration object of BarcodeScannerScreenConfiguration and
     * start the barcode scanner with the configuration
     */
    const config = new BarcodeScannerScreenConfiguration();
    /** Initialize the use case for single scanning */
    config.useCase = new SingleScanningMode();
    /** Start the BarcodeScanner */
    const result = await ScanbotBarcode.startScanner(config);
    /** Handle the result if there are scanned barcodes */
    if (result.status == 'OK') {
      alert(
        'Barcode Scanning successfully! \n' +
          `Value: ${result.data.items[0].barcode.text} \n` +
          `Format: ${result.data.items[0].barcode.format}`,
      );
    }
  } catch (e: any) {
    console.error('An error has occurred while running Barcode Scanner', e.message);
  }
}
