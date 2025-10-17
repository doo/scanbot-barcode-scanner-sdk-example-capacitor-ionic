import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';

import {
  BarcodeFormatCommonConfiguration,
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-multi-ar-scanning-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class RtuMultiArScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.RtuMultiArScanning,
    title: 'RTU UI Multi AR Scanning',
  };
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Create the default configuration object.
    const config = new BarcodeScannerScreenConfiguration();

    // Configure the usecase.
    config.useCase = new MultipleScanningMode();
    config.useCase.mode = 'UNIQUE';
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';
    config.useCase.sheet.collapsedVisibleHeight = 'SMALL';
    // Configure AR Overlay.
    config.useCase.arOverlay.visible = true;
    config.useCase.arOverlay.automaticSelectionEnabled = false;

    // Set an array of accepted barcode types.
    config.scannerConfiguration.barcodeFormatConfigurations = [
      new BarcodeFormatCommonConfiguration({
        formats: await this.scanbotUtils.getAcceptedBarcodeFormats(),
      }),
    ];

    config.scannerConfiguration.extractedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Configure other parameters as needed.

    try {
      const result = await ScanbotBarcode.startScanner(config);

      if (result.status === 'OK') {
        // Handle the scanned barcode from the result
        // Get JSON parcelable barcode items
        const resultContainer = await Promise.all(
          result.data.items.map(async (item) => ({
            ...(await item.barcode.serialize()),
            count: item.count,
          })),
        );

        await this.router.navigate(['/barcode-results', JSON.stringify(resultContainer)]);
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
