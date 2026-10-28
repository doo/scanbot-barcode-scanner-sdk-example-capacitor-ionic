import {
  BarcodeCustomUIComponent,
  BarcodeScannerConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

async function applyAROverlay(barcodeCustomUIComponent: BarcodeCustomUIComponent) {
  await barcodeCustomUIComponent.configuration.setOverlayConfiguration({
    overlayEnabled: true,
    textFormat: 'CODE_AND_TYPE',
    polygonColor: '#00CFA633',
    textColor: '#000000',
    textContainerColor: '#00CFA6CC',
    strokeColor: '#00CFA6CC',
  });

  await barcodeCustomUIComponent.configuration.setScannerConfiguration(
    new BarcodeScannerConfiguration({
      optimizedForOverlays: true,
    }),
  );
}
