import {
  BarcodeCustomUIComponent,
  BarcodeCustomUIConfiguration,
  BarcodeCustomUIResultHandlers,
  BarcodeScannerConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function createAndAttachScannerView(element: HTMLElement): Promise<BarcodeCustomUIComponent> {
  const barcodeCustomUIComponent = new BarcodeCustomUIComponent();

  const resultCallbacks: BarcodeCustomUIResultHandlers = {
    onBarcodeScannerResult: (result) => {
      //Handle scanned barcodes
    },
    onBarcodeTap: (barcode) => {
      //Handle tapped barcode in AR Overlay
    },

    onError: (error) => {
      //Handle errors during scanning
    },
  };

  const initialConfiguration: BarcodeCustomUIConfiguration = {
    // Camera related configurations
    cameraConfiguration: {
      touchToFocusEnabled: true,
    },
    // Finder related configurations
    finderConfiguration: {
      viewFinderEnabled: true,
      finderLineColor: '#00CFA6CC',
      finderLineWidth: 2,
    },
    // AR Overlay related configurations
    overlayConfiguration: {
      overlayEnabled: true,
      textFormat: 'CODE_AND_TYPE',
      polygonColor: '#00CFA6CC',
    },
    // Barcode Scanner configurations
    scannerConfiguration: new BarcodeScannerConfiguration(),
  };

  barcodeCustomUIComponent.attachScannerOnElement(
    element,
    false,
    resultCallbacks,
    initialConfiguration,
  );

  return barcodeCustomUIComponent;
}
