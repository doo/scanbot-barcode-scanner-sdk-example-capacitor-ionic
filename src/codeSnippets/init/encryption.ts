import { ScanbotBarcodeSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

const config = new SdkConfiguration({
  licenseKey: '',
  fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
  fileEncryptionMode: 'AES256',
});

const result = await ScanbotBarcodeSDK.initialize(config);
