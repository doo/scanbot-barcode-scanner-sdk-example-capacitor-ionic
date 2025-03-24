import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  ScanbotBarcodeSDK,
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
  BarcodeMappedData,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-multi-ar-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class RtuMultiArScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.RtuMultiArScanning,
    title: 'RTU UI Multi AR Scanning',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
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
    // Configure other parameters, pertaining to use case as needed.

    // Set an array of accepted barcode types.
    config.scannerConfiguration.barcodeFormats =
      await this.scanbotUtils.getAcceptedBarcodeFormats();
    config.scannerConfiguration.extractedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Configure other parameters as needed.

    try {
      const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);

      if (result.status === 'CANCELED') {
        // User has canceled the scanning operation
      } else if (result.data && result.data.items.length > 0) {
        // Handle the scanned barcode from result

        // Get json parcelable barcodes
        const resultContainer = await Promise.all(
          result.data.items.map(async (item) => ({
            ...(await item.barcode.serialize()),
            count: item.count,
          })),
        );

        await this.router.navigate(['/barcode-results', JSON.stringify(resultContainer)]);
      } else {
        await this.utils.showInfoAlert('No barcode scanned');
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
