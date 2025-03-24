import { BarcodeScannerScreenConfiguration } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

function rtuUiV2TopBarConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  // Configure the top bar.

  // Set the top bar mode.
  config.topBar.mode = 'GRADIENT';

  // Set the background color which will be used as a gradient.
  config.topBar.backgroundColor = '#C8193C';

  // Configure the status bar look. If visible - select DARK or LIGHT according to your app's theme color.
  config.topBar.statusBarMode = 'HIDDEN';

  // Configure the Cancel button.
  config.topBar.cancelButton.text = 'Cancel';
  config.topBar.cancelButton.foreground.color = '#FFFFFF';

  // Configure other parameters as needed.
}
