import {
  BarcodeCustomUIComponent,
  BarcodeScannerConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function applyTinyBarcodeScanMode(barcodeCustomUIComponent: BarcodeCustomUIComponent) {
  await barcodeCustomUIComponent.configuration.setFinderConfiguration({
    viewFinderEnabled: true,
  });

  await barcodeCustomUIComponent.configuration.setCameraConfiguration({
    minFocusDistanceLock: true,
  });

  await barcodeCustomUIComponent.configuration.setScannerConfiguration(
    new BarcodeScannerConfiguration({
      engineMode: 'NEXT_GEN_FAR_DISTANCE',
    }),
  );
}
