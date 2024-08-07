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
  selector: 'app-rtu-multi-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, NgIf],
})
export class RtuMultiScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.RtuMultiScanning,
    title: 'RTU UI Multi Scanning',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // Initialize the use case for multiple scanning.
    config.useCase = new MultipleScanningMode();

    // Set the counting mode.
    config.useCase.mode = 'COUNTING';

    // Set the sheet mode for the barcodes preview.
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';

    // Set the height for the collapsed sheet.
    config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

    // Enable manual count change.
    config.useCase.sheetContent.manualCountChangeEnabled = true;

    // Set the delay before same barcode counting repeat.
    config.useCase.countingRepeatDelay = 1000;

    // Configure the submit button.
    config.useCase.sheetContent.submitButton.text = 'Submit';
    config.useCase.sheetContent.submitButton.foreground.color = '#000000';

    // Implement mapping for the barcode item information
    config.useCase.barcodeInfoMapping.barcodeItemMapper = (
      barcodeItem,
      onResult,
      onError
    ) => {
      /** TODO: process scan result as needed to get your mapped data,
       * e.g. query your server to get product image, title and subtitle.
       * See example below.
       */
      const title = `Some product ${barcodeItem.textWithExtension}`;
      const subtitle = barcodeItem.type ?? 'Unknown';

      // If image from URL is used, on Android platform INTERNET permission is required.
      const image =
        'https://avatars.githubusercontent.com/u/1454920';
      // To show captured barcode image use BarcodeMappedData.barcodeImageKey
      // const image = BarcodeMappedData.barcodeImageKey;

      /** Call onError() in case of error during obtaining mapped data. */
      if (barcodeItem.textWithExtension == 'Error occurred!') {
        onError();
      } else {
        onResult(
          new BarcodeMappedData({
            title: title,
            subtitle: subtitle,
            barcodeImage: image,
          })
        );
      }
    };

    // Configure other parameters, pertaining to multiple-scanning mode as needed.

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
