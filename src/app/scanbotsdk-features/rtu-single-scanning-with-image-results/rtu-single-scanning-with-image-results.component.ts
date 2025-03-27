import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  ScanbotBarcodeSDK,
  BarcodeScannerScreenConfiguration,
  SingleScanningMode,
  autorelease,
  ToJsonConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-single-scanning-with-image-results-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class RtuSingleScanningWithImageResultsFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.RtuSingleScanning,
    title: 'RTU UI Single Scanning With Image Results',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Create the default configuration object.
    const config = new BarcodeScannerScreenConfiguration();

    // Initialize the use case for single scanning.
    config.useCase = new SingleScanningMode();

    // Enable and configure the confirmation sheet.
    config.useCase.confirmationSheetEnabled = true;
    config.useCase.sheetColor = '#FFFFFF';

    // Hide/show the barcode image.
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
    config.scannerConfiguration.barcodeFormats =
      await this.scanbotUtils.getAcceptedBarcodeFormats();
    config.scannerConfiguration.extractedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Specify if the scanned barcode images should be included in the result.
    config.scannerConfiguration.returnBarcodeImage = true;

    // Configure other parameters as needed.

    try {
      // An autorelease pool is mandatory only if image results are enabled.
      await autorelease(async () => {
        const result = await ScanbotBarcodeSDK.startBarcodeScanner(config);

        if (result.status === 'CANCELED') {
          // User has canceled the scanning operation
        } else if (result.data && result.data.items.length > 0) {
          // Handle the scanned barcode from result

          /** Get JSON parcelable barcode items
           * By default, when we serialize barcodes, images are serialized as references.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           * Since we only need to preview these images on the result screen, we can serialize them as buffers and immediately release the references from here.
           */
          const resultContainer = await Promise.all(
            result.data.items.map(async (item) => ({
              ...(await item.barcode.serialize(
                new ToJsonConfiguration({ imageSerializationMode: 'BUFFER' }),
              )),
              count: item.count,
            })),
          );

          await this.router.navigate(['/barcode-results', JSON.stringify(resultContainer)]);
        } else {
          await this.utils.showInfoAlert('No barcode scanned');
        }
      });
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
