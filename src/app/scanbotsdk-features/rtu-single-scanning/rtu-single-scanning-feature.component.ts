import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  startBarcodeScanner,
  BarcodeScannerConfiguration,
  SingleScanningMode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk/ui_v2';

@Component({
  selector: 'app-rtu-single-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, NgIf],
})
export class RtuSingleScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.RtuSingleScanning,
    title: 'RTU UI Single Scanning',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // Initialize the use case for single scanning.
    config.useCase = new SingleScanningMode();

    // Enable and configure the confirmation sheet.
    config.useCase.confirmationSheetEnabled = true;
    config.useCase.sheetColor = '#FFFFFF';

    // Hide/unhide the barcode image.
    config.useCase.barcodeImageVisible = true;

    // Configure the barcode title of the confirmation sheet.
    config.useCase.barcodeTitle.visible = true;
    config.useCase.barcodeTitle.color = '#000000';

    // Configure the barcode subtitle of the confirmation sheet.
    config.useCase.barcodeSubtitle.visible = true;
    config.useCase.barcodeSubtitle.color = '#000000';

    // Configure the cancel button of the confirmation sheet.
    config.useCase.cancelButton.text = 'Close';
    config.useCase.cancelButton.foreground.color = '#C8193C';
    config.useCase.cancelButton.background.fillColor = '#00000000';

    // Configure the submit button of the confirmation sheet.
    config.useCase.submitButton.text = 'Submit';
    config.useCase.submitButton.foreground.color = '#FFFFFF';
    config.useCase.submitButton.background.fillColor = '#C8193C';

    // Configure other parameters, pertaining to single-scanning mode as needed.

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
