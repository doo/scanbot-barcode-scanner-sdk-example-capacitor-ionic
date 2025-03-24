import { Component } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

import { FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-license-info-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel, NgIf],
})
export class LicenseInfoFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.LicenseInfo,
    title: 'View License Info',
  };

  override async featureClicked() {
    try {
      const result = await ScanbotBarcodeSDK.getLicenseInfo();

      const formattedText =
        `• The license is ${result.isLicenseValid ? 'VALID' : 'NOT VALID'}` +
        `<br />• Expiration Date:
          ${
            result.licenseExpirationDate
              ? new Date(result.licenseExpirationDate).toDateString()
              : 'N/A'
          }` +
        `<br />• Status: ${result.licenseStatus}`;

      await this.utils.showAlert({
        header: 'License',
        message: formattedText,
        buttons: ['OK'],
      });
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
