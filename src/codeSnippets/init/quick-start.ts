import { ScanbotBarcodeSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

ScanbotBarcodeSDK.initialize(new SdkConfiguration({ licenseKey: '' }))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
