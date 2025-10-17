import { ScanbotBarcodeSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

const config = new SdkConfiguration({
  licenseKey: '',
  loggingEnabled: true,
});

const result = await ScanbotBarcodeSDK.initialize(config);
