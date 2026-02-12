import {
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

function configurePreviewMode() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Initialize the use case for multiple scanning.
  config.useCase = new MultipleScanningMode();

  // Set the sheet mode for the barcodes preview.
  config.useCase.sheet.mode = 'COLLAPSED_SHEET';

  // Set the height for the collapsed sheet.
  config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

  // Configure the submit button on the sheet.
  config.useCase.sheetContent.submitButton.text = 'Submit';
  config.useCase.sheetContent.submitButton.foreground.color = '#000000';

  // Configure other parameters as needed.
}
