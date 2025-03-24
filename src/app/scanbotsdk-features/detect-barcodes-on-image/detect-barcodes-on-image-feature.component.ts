import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { ImageUtils } from '../../utils/image-utils';

import {
  BarcodeFormatCommonConfiguration,
  BarcodeFormatCode128Configuration,
  BarcodeScannerConfiguration,
  ScanbotBarcodeSDK,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-detect-barcodes-on-image-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class DetectBarcodesOnImageFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private imageUtils = inject(ImageUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.DetectBarcodesOnImage,
    title: 'Import Image & Detect Barcodes',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      // Select image from library
      const imageFileUri = await this.imageUtils.selectImageFromLibrary();

      const scannerConfiguration = new BarcodeScannerConfiguration();
      scannerConfiguration.extractedDocumentFormats =
        await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

      const barcodeFormatCommonConfiguration = new BarcodeFormatCommonConfiguration();
      barcodeFormatCommonConfiguration.formats =
        await this.scanbotUtils.getAcceptedBarcodeFormats();
      barcodeFormatCommonConfiguration.stripCheckDigits = true;
      barcodeFormatCommonConfiguration.minimumTextLength = 5;

      // Configure different parameters for specific barcode format.
      const barcodeFormatCode128Configuration = new BarcodeFormatCode128Configuration();
      barcodeFormatCode128Configuration.minimumTextLength = 6;

      scannerConfiguration.barcodeFormatConfigurations = [
        barcodeFormatCommonConfiguration,
        barcodeFormatCode128Configuration,
      ];

      // Configure other parameters as needed.

      await this.utils.showLoader();

      const result = await ScanbotBarcodeSDK.detectBarcodesOnImage({
        imageFileUri: imageFileUri,
        configuration: scannerConfiguration,
      });

      await this.utils.dismissLoader();

      if (result.success) {
        // Handle the detected barcode(s) from result

        // Get json parcelable barcodes
        const resultContainer = await Promise.all(
          result.barcodes.map(async (item) => ({
            ...(await item.serialize()),
            count: 1,
          })),
        );

        await this.router.navigate(['/barcode-results', JSON.stringify(resultContainer)]);
      } else {
        await this.utils.showInfoAlert('No barcodes detected');
      }
    } catch (error: any) {
      await this.utils.dismissLoader();

      await this.utils.showErrorAlert(error);
    }
  }
}
