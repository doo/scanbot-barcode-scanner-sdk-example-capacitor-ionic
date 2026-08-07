import {
  BarcodeCustomUIComponent,
  BarcodeCustomUIConfiguration,
  BarcodeCustomUIResultHandlers,
  BarcodeScannerConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

function createAndAttachBarcodeScanner(element: HTMLElement) {
  const barcodeCustomUIComponent = new BarcodeCustomUIComponent();

  const resultCallbacks: BarcodeCustomUIResultHandlers = {
    onBarcodeScannerResult: (result) => {
      //Handle all scanned barcodes
    },
    onBarcodeTap: (result) => {
      //Handle selected/tapped barcode
    },
    onError: (error) => {
      //Handle errors during scanning
    },
  };

  const initialConfiguration: BarcodeCustomUIConfiguration = {
    // AR Overlay related configurations
    overlayConfiguration: {
      overlayEnabled: true,
      textFormat: 'CODE_AND_TYPE',
      polygonColor: '#00CFA633',
      strokeColor: '#00CFA6CC',
      textColor: '#ffffff',
      textContainerColor: '#00CFA6CC',
    },
    // Barcode Scanner configurations
    scannerConfiguration: new BarcodeScannerConfiguration({
      optimizedForOverlays: true,
    }),
  };

  barcodeCustomUIComponent.attachScannerOnElement(
    element,
    false,
    resultCallbacks,
    initialConfiguration,
  );

  return barcodeCustomUIComponent;
}
