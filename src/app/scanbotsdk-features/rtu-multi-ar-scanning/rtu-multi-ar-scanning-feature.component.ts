import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  startBarcodeScanner,
  BarcodeScannerConfiguration,
  MultipleScanningMode,
  BarcodeMappedData,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk/ui_v2';

@Component({
  selector: 'app-rtu-multi-ar-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
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
    const config = new BarcodeScannerConfiguration();

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
    config.recognizerConfiguration.barcodeFormats =
      await this.scanbotUtils.getAcceptedBarcodeFormats();
    config.recognizerConfiguration.acceptedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Configure other parameters as needed.

    try {
      const result = await startBarcodeScanner(config);

      if (result.status === 'CANCELED') {
        // User has canceled the scanning operation
      } else if (result.data?.items && result.data.items.length > 0) {
        // Handle the scanned barcode from result
        await this.router.navigate([
          '/barcode-results',
          JSON.stringify(result.data.items),
        ]);
      } else {
        await this.utils.showInfoAlert('No barcode scanned');
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
