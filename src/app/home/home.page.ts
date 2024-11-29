import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel, IonFooter,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { CommonUtils } from '../utils/common-utils';

import { RtuSingleScanningFeatureComponent } from '../scanbotsdk-features/rtu-single-scanning/rtu-single-scanning-feature.component';
import { RtuMultiScanningFeatureComponent } from '../scanbotsdk-features/rtu-multi-scanning/rtu-multi-scanning-feature.component';
import { RtuMultiArScanningFeatureComponent } from '../scanbotsdk-features/rtu-multi-ar-scanning/rtu-multi-ar-scanning-feature.component';
import { RtuFindAndPickScanningFeatureComponent } from '../scanbotsdk-features/rtu-find-and-pick-scanning/rtu-find-and-pick-scanning-feature.component';
import { DetectBarcodesOnImageFeatureComponent } from '../scanbotsdk-features/detect-barcodes-on-image/detect-barcodes-on-image-feature.component';
import { ExtractImagesFromPdfFeatureComponent } from '../scanbotsdk-features/extract-images-from-pdf/extract-images-from-pdf-feature.component';
import { LicenseInfoFeatureComponent } from '../scanbotsdk-features/license-info/license-info-feature.component';
import { StorageCleanupFeatureComponent } from '../scanbotsdk-features/storage-cleanup/storage-cleanup-feature.component';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    RtuSingleScanningFeatureComponent,
    RtuMultiScanningFeatureComponent,
    RtuMultiArScanningFeatureComponent,
    RtuFindAndPickScanningFeatureComponent,
    DetectBarcodesOnImageFeatureComponent,
    ExtractImagesFromPdfFeatureComponent,
    LicenseInfoFeatureComponent,
    StorageCleanupFeatureComponent,
    IonFooter,
  ],
})
export class HomePage {
  private utils = inject(CommonUtils);
  private router = inject(Router);

  readonly currentYear = new Date().getFullYear();

  constructor() {}

  async showBarcodeFormatsScreen() {
    if (await this.isLicenseValid()) {
      this.router.navigate(['/barcode-formats']);
    }
  }

  async showBarcodeDocumentFormatsScreen() {
    if (await this.isLicenseValid()) {
      this.router.navigate(['/barcode-document-formats']);
    }
  }

  private async isLicenseValid(): Promise<boolean> {
    try {
      const result = await ScanbotBarcodeSDK.getLicenseInfo();

      if (result.data?.isLicenseValid === true) {
        // We have a valid (trial) license and can call other Scanbot Barcode Scanner SDK methods.
        // E.g. launch the Barcode Scanner
        return true;
      } else {
        // The license is not valid. We will return false and show the status
        await this.utils.showWarningAlert(
          result.data?.licenseStatusMessage ?? 'Invalid License'
        );
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }

    return false;
  }
}
