import { Component, Input, inject } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

import { CommonUtils } from '../../utils/common-utils';
import { Feature } from '../../utils/scanbot-utils';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-scanbotsdk-feature',
  templateUrl: './scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class ScanbotSdkFeatureComponent {
  @Input() feature!: Feature;

  utils = inject(CommonUtils);

  constructor() {}

  async featureClicked() {
    throw new Error('Not implemented');
  }

  async isLicenseValid(): Promise<boolean> {
    try {
      const result = await ScanbotBarcodeSDK.getLicenseInfo();

      if (result.isValid) {
        // We have a valid (trial) license and can call other Scanbot Barcode Scanner SDK methods.
        // E.g. launch the Barcode Scanner
        return true;
      } else {
        // The license is not valid. We will return false and show the status
        this.utils.showWarningAlert(result.licenseStatusMessage ?? 'Invalid License');
      }
    } catch (error: any) {
      this.utils.showErrorAlert(error);
    }

    return false;
  }
}
