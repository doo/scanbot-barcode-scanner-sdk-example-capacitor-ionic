import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonList,
  IonRow,
  IonImg,
  IonItem,
  IonLabel,
  IonButtons,
  IonListHeader,
  IonBackButton,
} from '@ionic/angular/standalone';

import { CommonUtils } from 'src/app/utils/common-utils';

import { BarcodeResultField } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

export interface ListItem {
  mainResult: BarcodeResultField;
  formattedResult: string;
}

@Component({
  selector: 'app-barcode-results',
  templateUrl: './barcode-results.page.html',
  styleUrls: ['./barcode-results.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonListHeader,
    IonButtons,
    IonLabel,
    IonItem,
    IonImg,
    IonRow,
    IonList,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class BarcodeResultsPage implements OnInit {
  private utils = inject(CommonUtils);
  private activatedRoute = inject(ActivatedRoute);

  listItems: ListItem[] = [];

  constructor() {}

  async ngOnInit() {
    const barcodeResults: [BarcodeResultField] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('results') as string
    );

    barcodeResults.forEach((result) => {
      this.listItems.push({
        mainResult: result,
        formattedResult: result.formattedResult
          ? JSON.stringify(result.formattedResult, null, 2)
          : 'N/A',
      });
    });
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }
}
