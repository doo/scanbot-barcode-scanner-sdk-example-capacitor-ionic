import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonToggle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

import { CommonUtils } from 'src/app/utils/common-utils';
import { BarcodeSetting, ScanbotUtils } from 'src/app/utils/scanbot-utils';

@Component({
  selector: 'app-barcode-formats',
  templateUrl: './barcode-formats.page.html',
  styleUrls: ['./barcode-formats.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonList,
    IonItem,
    IonToggle,
    IonBackButton,
    CommonModule,
    FormsModule,
  ],
})
export class BarcodeFormatsPage implements OnInit {
  private utils = inject(CommonUtils);
  private scanbotUtils = inject(ScanbotUtils);

  barcodeSettings!: BarcodeSetting[];

  constructor() {}

  async ngOnInit() {
    this.barcodeSettings = await this.scanbotUtils.getBarcodeSettings();
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  async barcodeSettingStateChanged(event: any, barcode: BarcodeSetting) {
    await this.scanbotUtils.setBarcodeFormatAccepted(
      barcode.format,
      event.target.checked
    );
  }
}
