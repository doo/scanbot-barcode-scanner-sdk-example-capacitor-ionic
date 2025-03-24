import { BarcodeScannerScreenConfiguration } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

function rtuUiV2LocalizationConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Configure localization parameters.
  config.localization.barcodeInfoMappingErrorStateCancelButton = 'Custom Cancel title';
  config.localization.cameraPermissionCloseButton = 'Custom Close title';
  // Configure other strings as needed.

  // Configure other parameters as needed.
}
