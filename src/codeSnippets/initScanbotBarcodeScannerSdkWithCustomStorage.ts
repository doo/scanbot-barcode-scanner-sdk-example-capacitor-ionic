import {ScanbotBarcodeSDK, ScanbotBarcodeSdkConfiguration} from "capacitor-plugin-scanbot-barcode-scanner-sdk";

async function initScanbotBarcodeScannerSdkWithCustomStorage() {
  const config: ScanbotBarcodeSdkConfiguration = {
    storageBaseDirectory: 'file:///some/custom/storage-dir/',
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result.data);
  } catch (error: any) {
    console.error(error);
  }
}
