import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { ImageUtils } from '../../utils/image-utils';

import {
  DetectBarcodesOnImageArguments,
  ScanbotBarcodeSDK,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-detect-barcodes-on-image-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, NgIf],
})
export class DetectBarcodesOnImageFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private imageUtils = inject(ImageUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.LegacyScanBarcodes,
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

      const args: DetectBarcodesOnImageArguments = {
        imageFileUri: imageFileUri,
        stripCheckDigits: true,
        barcodeFormats: await this.scanbotUtils.getAcceptedBarcodeFormats(), // optional filter for specific barcode types
        acceptedDocumentFormats:
          await this.scanbotUtils.getAcceptedBarcodeDocumentFormats(), // optional filter for specific document types
        // see further args ...
      };
      await this.utils.showLoader();

      const result = await ScanbotBarcodeSDK.detectBarcodesOnImage(args);

      await this.utils.dismissLoader();

      if (result.data?.barcodes && result.data.barcodes.length > 0) {
        // Handle the detected barcode(s) from result
        await this.router.navigate([
          '/legacy-barcode-results',
          JSON.stringify(result.data.barcodes),
        ]);
      } else {
        await this.utils.showInfoAlert('No barcodes detected');
      }
    } catch (error: any) {
      await this.utils.dismissLoader();

      await this.utils.showErrorAlert(error);
    }
  }
}
