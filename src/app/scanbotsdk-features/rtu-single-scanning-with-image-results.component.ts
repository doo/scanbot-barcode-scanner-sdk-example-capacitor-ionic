import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';

import {
  autorelease,
  BarcodeFormatCommonConfiguration,
  BarcodeScannerScreenConfiguration,
  ScanbotBarcode,
  SingleScanningMode,
  ToJsonConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-single-scanning-with-image-results-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class RtuSingleScanningWithImageResultsFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.RtuSingleScanning,
    title: 'RTU UI Single Scanning With Image Results',
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

    // Set an array of accepted barcode types.
    config.scannerConfiguration.barcodeFormatConfigurations = [
      new BarcodeFormatCommonConfiguration({
        formats: await this.scanbotUtils.getAcceptedBarcodeFormats(),
      }),
    ];

    config.scannerConfiguration.extractedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Specify if the scanned barcode images should be included in the result.
    config.scannerConfiguration.returnBarcodeImage = true;

    // Configure other parameters, pertaining to single-scanning mode as needed.

    try {
      // An autorelease pool is mandatory only if image results are enabled.
      await autorelease(async () => {
        const result = await ScanbotBarcode.startScanner(config);

        if (result.status === 'OK') {
          // Handle the scanned barcode from the result

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
        }
      });
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
