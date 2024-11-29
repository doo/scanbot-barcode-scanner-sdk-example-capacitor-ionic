import {ScanbotBarcodeSDK, ScanbotBarcodeSdkConfiguration} from "capacitor-plugin-scanbot-barcode-scanner-sdk";

async function initScanbotBarcodeScannerSdkWithEncryption() {
  const config: ScanbotBarcodeSdkConfiguration = {
    fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
    fileEncryptionMode: 'AES256',
  };

  try {
    const result = await ScanbotBarcodeSDK.initializeSdk(config);
    console.log(result.data);
  } catch (error: any) {
    console.error(error);
  }
}