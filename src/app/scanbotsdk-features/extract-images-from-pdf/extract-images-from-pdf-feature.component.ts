import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FileUtils } from 'src/app/utils/file-utils';

import {
  ExtractImagesFromPdfArguments,
  ScanbotBarcodeSDK,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-extract-images-from-pdf-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class ExtractImagesFromPdfFeatureComponent extends ScanbotSdkFeatureComponent {
  private fileUtils = inject(FileUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.ExtractImagesFromPdf,
    title: 'Extract Images from PDF',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      // Select PDF file from library
      const pdfFilePath = await this.fileUtils.selectPdfFile();

      const args: ExtractImagesFromPdfArguments = {
        pdfFilePath: pdfFilePath,
      };
      await this.utils.showLoader();

      const extractedImages = await ScanbotBarcodeSDK.extractImagesFromPDF(args);

      await this.utils.dismissLoader();

      if (extractedImages.length > 0) {
        await this.router.navigate(['/image-results', JSON.stringify(extractedImages)]);
      } else {
        await this.utils.showInfoAlert('No images extracted');
      }
    } catch (error: any) {
      await this.utils.dismissLoader();

      await this.utils.showErrorAlert(error);
    }
  }
}
