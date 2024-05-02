import { Component } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

import { FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import { ScanbotBarcodeSDK } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-storage-cleanup-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, NgIf],
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
      const result = await ScanbotBarcodeSDK.cleanup();

      await this.utils.showInfoAlert(result?.data ?? 'SDK storage cleaned');
    } catch (error: any) {
      await this.utils.showErrorAlert(error);
    }
  }
}
