import { Component, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { FeatureId, ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  BarcodeScannerConfiguration,
  ScanbotBarcodeSDK,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-rtu-barcode-scanner-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, NgIf],
})
export class RtuBarcodeScannerFeatureComponent extends ScanbotSdkFeatureComponent {
  private scanbotUtils = inject(ScanbotUtils);
  private router = inject(Router);

  override feature = {
    id: FeatureId.ScanBarcodes,
    title: 'Scan QR-/Barcode',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    const configuration: BarcodeScannerConfiguration = {
      // Customize colors, text resources, behavior, etc..
      finderTextHint:
        'Please align the barcode or QR code in the frame above to scan it.',
      orientationLockMode: 'PORTRAIT',
      finderLineColor: '#ffffff',
      barcodeFormats: await this.scanbotUtils.getAcceptedBarcodeFormats(), // optional filter for specific barcode types
      acceptedDocumentFormats:
        await this.scanbotUtils.getAcceptedBarcodeDocumentFormats(), // optional filter for specific document types
      finderAspectRatio: { width: 1, height: 1 },
      useButtonsAllCaps: false,
      // see further configs ...
    };

    try {
      const result = await ScanbotBarcodeSDK.startBarcodeScanner(configuration);

      if (result.status === 'CANCELED') {
        // User has canceled the scanning operation
      } else if (result.data?.barcodes && result.data.barcodes.length > 0) {
        // Handle the scanned barcode from result
        await this.router.navigate([
          '/barcode-results',
          JSON.stringify(result.data.barcodes),
        ]);
      } else {
        await this.utils.showInfoAlert('No barcode scanned');
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
