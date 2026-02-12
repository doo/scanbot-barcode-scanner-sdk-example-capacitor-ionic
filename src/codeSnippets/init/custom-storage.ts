import { ScanbotBarcodeSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

const config = new SdkConfiguration({
  licenseKey: '',
  storageBaseDirectory: 'file:///some/custom/storage-dir/',
});

const result = await ScanbotBarcodeSDK.initialize(config);
