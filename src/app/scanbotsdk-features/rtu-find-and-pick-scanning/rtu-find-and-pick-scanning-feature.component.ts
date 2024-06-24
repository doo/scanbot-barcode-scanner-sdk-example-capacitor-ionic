import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  startBarcodeScanner,
  BarcodeScannerConfiguration,
  FindAndPickScanningMode,
  ExpectedBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk/ui_v2';

@Component({
  selector: 'app-rtu-find-and-pick-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
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
    const config = new BarcodeScannerConfiguration();

    // Initialize the use case for find and pick scanning.
    config.useCase = new FindAndPickScanningMode();

    // Set the sheet mode for the barcodes preview.
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';

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
        image:
          'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      }),
      new ExpectedBarcode({
        barcodeValue: 'SCANBOT',
        title: 'value barcode',
        count: 3,
        image:
          'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      }),
    ];

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
