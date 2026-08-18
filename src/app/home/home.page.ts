import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { CommonUtils } from '../utils/common-utils';

import { RtuSingleScanningFeatureComponent } from '../scanbotsdk-features/rtu-single-scanning-feature.component';
import { RtuSingleScanningWithImageResultsFeatureComponent } from '../scanbotsdk-features/rtu-single-scanning-with-image-results.component';
import { RtuMultiScanningFeatureComponent } from '../scanbotsdk-features/rtu-multi-scanning-feature.component';
import { RtuMultiArScanningFeatureComponent } from '../scanbotsdk-features/rtu-multi-ar-scanning-feature.component';
import { RtuScanAndCountFeatureComponent } from '../scanbotsdk-features/rtu-scan-and-count-feature.component';
import { RtuFindAndPickScanningFeatureComponent } from '../scanbotsdk-features/rtu-find-and-pick-scanning-feature.component';
import { ScanBarcodesFromImageFeatureComponent } from '../scanbotsdk-features/scan-barcodes-from-image-feature.component';
import { ScanBarcodesOnPdfFeatureComponent } from '../scanbotsdk-features/scan-barcodes-from-pdf.component';
import { LicenseInfoFeatureComponent } from '../scanbotsdk-features/license-info-feature.component';
import { StorageCleanupFeatureComponent } from '../scanbotsdk-features/storage-cleanup-feature.component';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    RtuSingleScanningFeatureComponent,
    RtuSingleScanningWithImageResultsFeatureComponent,
    RtuMultiScanningFeatureComponent,
    RtuMultiArScanningFeatureComponent,
    RtuFindAndPickScanningFeatureComponent,
    ScanBarcodesFromImageFeatureComponent,
    ScanBarcodesOnPdfFeatureComponent,
    LicenseInfoFeatureComponent,
    StorageCleanupFeatureComponent,
    RtuScanAndCountFeatureComponent,
  ],
})
export class HomePage {
  readonly currentYear = new Date().getFullYear();
  private utils = inject(CommonUtils);
  private router = inject(Router);

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

  navigateClassic() {
    this.router.navigate(['/barcode-classic']);
  }

  navigateClassicAlternate() {
    this.router.navigate(['/barcode-classic-alternate']);
  }

  private async isLicenseValid(): Promise<boolean> {
    try {
      const result = await ScanbotBarcodeSDK.getLicenseInfo();

      if (result.isValid) {
        // We have a valid (trial) license and can call other Scanbot Barcode Scanner SDK methods.
        // E.g. launch the Barcode Scanner
        return true;
      } else {
        // The license is not valid. We will return false and show the status
        await this.utils.showWarningAlert(result.licenseStatusMessage ?? 'Invalid License');
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }

    return false;
  }
}
