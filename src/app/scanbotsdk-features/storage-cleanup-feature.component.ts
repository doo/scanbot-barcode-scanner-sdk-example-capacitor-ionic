import { Component } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature/scanbotsdk-feature.component';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-storage-cleanup-feature',
  templateUrl: './scanbotsdk-feature/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature/scanbotsdk-feature.component.scss'],
  imports: [IonItem, IonLabel],
})
export class StorageCleanupFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.StorageCleanup,
    title: 'Cleanup SDK Storage',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      await ScanbotBarcodeSDK.cleanupStorage();
      await this.utils.showInfoAlert('Cleanup was successful!');
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
