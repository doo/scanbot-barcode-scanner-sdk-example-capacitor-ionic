import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';
import { ImageUtils } from '../utils/image-utils';

import {
  BarcodeFormatCode128Configuration,
  BarcodeFormatCommonConfiguration,
  BarcodeScannerConfiguration,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-scan-barcodes-from-image-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class ScanBarcodesFromImageFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.ScanBarcodesFromImage,
    title: 'Import Image & Scan Barcodes',
  };
  private scanbotUtils = inject(ScanbotUtils);
  private imageUtils = inject(ImageUtils);
  private router = inject(Router);

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
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

      const result = await ScanbotBarcode.scanFromImage({
        image: imageFileUri,
        configuration: scannerConfiguration,
      });

      await this.utils.dismissLoader();

      if (result.success) {
        // Handle the detected barcode(s) from result

        // Get JSON parcelable barcode items
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
