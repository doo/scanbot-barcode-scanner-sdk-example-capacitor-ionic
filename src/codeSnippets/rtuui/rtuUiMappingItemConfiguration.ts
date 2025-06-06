import {
  BarcodeMappedData,
  BarcodeScannerScreenConfiguration,
  SingleScanningMode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

function rtuUiMappingItemConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerScreenConfiguration();

  config.useCase = new SingleScanningMode();

  config.useCase.barcodeInfoMapping.barcodeItemMapper = (barcodeItem, onResult, onError) => {
    /** TODO: process scan result as needed to get your mapped data,
     * e.g. query your server to get product image, title and subtitle.
     * See example below.
     */
    const title = `Some product ${barcodeItem.text}`;
    const subtitle = barcodeItem.format;

    // If image from URL is used, on Android platform INTERNET permission is required.
    const image = 'https://avatars.githubusercontent.com/u/1454920';
    // To show captured barcode image use BarcodeMappedData.barcodeImageKey
    // const image = BarcodeMappedData.barcodeImageKey;

    /** Call onError() in case of error during obtaining mapped data. */
    if (barcodeItem.text === 'Error occurred!') {
      onError();
    } else {
      onResult(
        new BarcodeMappedData({
          title: title,
          subtitle: subtitle,
          barcodeImage: image,
        }),
      );
    }
  };

  // Configure other parameters as needed.
}
