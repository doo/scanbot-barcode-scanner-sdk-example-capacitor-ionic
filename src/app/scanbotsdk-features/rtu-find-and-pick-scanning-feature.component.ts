import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';

import {
  BarcodeFormatCommonConfiguration,
  BarcodeScannerScreenConfiguration,
  ExpectedBarcode,
  FindAndPickScanningMode,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-find-and-pick-scanning-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class RtuFindAndPickScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.RtuFindAndPickScanning,
    title: 'RTU UI Find And Pick Scanning',
  };
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

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
    config.scannerConfiguration.barcodeFormatConfigurations = [
      new BarcodeFormatCommonConfiguration({
        formats: await this.scanbotUtils.getAcceptedBarcodeFormats(),
      }),
    ];

    config.scannerConfiguration.extractedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Configure other parameters, pertaining to findAndPick-scanning mode as needed.

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
