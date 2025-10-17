import { Component } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';

import { FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-license-info-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class LicenseInfoFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.LicenseInfo,
    title: 'View License Info',
  };

  override async featureClicked() {
    try {
      const result = await ScanbotBarcodeSDK.getLicenseInfo();

      const formattedText = [
        `• The license is ${result.isValid ? 'VALID' : 'NOT VALID'}`,
        `• Expiration Date: ${result.expirationDateString}`,
        `• Status: ${result.licenseStatusMessage}`,
      ];

      await this.utils.showAlert({
        header: 'License',
        message: formattedText.join('<br />'),
        buttons: ['OK'],
      });
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
