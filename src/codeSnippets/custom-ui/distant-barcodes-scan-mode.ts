import {
  BarcodeCustomUIComponent,
  BarcodeScannerConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function distantBarcodesScanMode(barcodeCustomUIComponent: BarcodeCustomUIComponent) {
  await barcodeCustomUIComponent.configuration.setFinderConfiguration({
    viewFinderEnabled: true,
  });

  await barcodeCustomUIComponent.configuration.setCameraConfiguration({
    cameraZoomFactor: 1,
  });

  await barcodeCustomUIComponent.configuration.setScannerConfiguration(
    new BarcodeScannerConfiguration({
      engineMode: 'NEXT_GEN_FAR_DISTANCE',
    }),
  );
}
