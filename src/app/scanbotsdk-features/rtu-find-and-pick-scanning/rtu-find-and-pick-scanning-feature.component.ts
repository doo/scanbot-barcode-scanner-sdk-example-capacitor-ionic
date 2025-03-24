import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  ScanbotBarcodeSDK,
  BarcodeScannerScreenConfiguration,
  FindAndPickScanningMode,
  ExpectedBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-find-and-pick-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class RtuFindAndPickScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.RtuFindAndPickScanning,
    title: 'RTU UI Find And Pick Scanning',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Create the default configuration object.
    const config = new BarcodeScannerScreenConfiguration();

    // Initialize the use case for find and pick scanning.
    config.useCase = new FindAndPickScanningMode();

    // Set the sheet mode for the barcodes preview.
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';

    // Enable AR Overlay
    config.useCase.arOverlay.visible = true;

    // Enable/Disable the automatic selection.
    config.useCase.arOverlay.automaticSelectionEnabled = false;

    // Set the height for the collapsed sheet.
    config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

    // Enable manual count change.
    config.useCase.sheetContent.manualCountChangeEnabled = true;

    // Set the delay before same barcode counting repeat.
    config.useCase.countingRepeatDelay = 1000;

    // Configure the submit button.
    config.useCase.sheetContent.submitButton.text = 'Submit';
    config.useCase.sheetContent.submitButton.foreground.color = '#000000';

    // Configure other parameters, pertaining to findAndPick-scanning mode as needed.

    // Set the expected barcodes.
    config.useCase.expectedBarcodes = [
      new ExpectedBarcode({
        barcodeValue: '123456',
        title: 'numeric barcode',
        count: 4,
        image: 'https://avatars.githubusercontent.com/u/1454920',
      }),
      new ExpectedBarcode({
        barcodeValue: 'SCANBOT',
        title: 'value barcode',
        count: 3,
        image: 'https://avatars.githubusercontent.com/u/1454920',
      }),
    ];

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
