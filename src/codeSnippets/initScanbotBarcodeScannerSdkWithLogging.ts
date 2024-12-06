import {ScanbotBarcodeSDK, ScanbotBarcodeSdkConfiguration} from "capacitor-plugin-scanbot-barcode-scanner-sdk";

async function initScanbotBarcodeScannerSdkWithLogging() {
  const config: ScanbotBarcodeSdkConfiguration = {
    licenseKey: '',
    loggingEnabled: true,
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result.data);
  } catch (error: any) {
    console.error(error);
  }
}
