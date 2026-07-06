import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';
import { ScanbotUtils } from '../utils/scanbot-utils';
import { Router } from '@angular/router';
import {
  BarcodeFormatCommonConfiguration,
  BarcodeMappedData,
  BarcodeScannerScreenConfiguration,
  MultipleScanningMode,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-scan-and-count-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class RtuScanAndCountFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    title: 'RTU UI Scan And Count',
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
    config.useCase.barcodeInfoMapping.barcodeItemMapper = (barcodeItem, onResult, onError) => {
      /** TODO: process scan result as needed to get your mapped data,
       * e.g. query your server to get product image, title and subtitle.
       *
       * Note: The built-in fetch API won't work properly in this case.
       * To request from the server, please use XMLHttpRequest API or another 3rd party library such as axios.
       *
       * See example below.
       */
      const title = `Some product ${barcodeItem.text}`;
      const subtitle = barcodeItem.format;

      // If image from URL is used, on Android platform INTERNET permission is required.
      const image = 'https://avatars.githubusercontent.com/u/1454920';
      // To show captured barcode image use BarcodeMappedData.barcodeImageKey
      // const image = BarcodeMappedData.barcodeImageKey;

      /** Call onError() in case of error during obtaining mapped data. */
      if (barcodeItem.text === 'Error occurred!') {
        onError();
      } else {
        onResult(new BarcodeMappedData({ title: title, subtitle: subtitle, barcodeImage: image }));
      }
    };

    // Configure other parameters, pertaining to multiple-scanning mode as needed.

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

      if (result.status === 'OK' && result.data) {
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
