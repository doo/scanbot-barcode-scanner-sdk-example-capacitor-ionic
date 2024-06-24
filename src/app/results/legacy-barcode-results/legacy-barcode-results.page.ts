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

import {
  BarcodeResultField,
  BoardingPass,
  GenericDocument,
  RootTypeName,
  SwissQR,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

export interface LegacyBarcodeResultListItem {
  mainResult: BarcodeResultField;
  formattedResult: string;
}

@Component({
  selector: 'app-legacy-barcode-results',
  templateUrl: './legacy-barcode-results.page.html',
  styleUrls: ['./legacy-barcode-results.page.scss'],
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
export class LegacyBarcodeResultsPage implements OnInit {
  private utils = inject(CommonUtils);
  private activatedRoute = inject(ActivatedRoute);

  listItems: LegacyBarcodeResultListItem[] = [];

  constructor() {}

  async ngOnInit() {
    const barcodeResults: [BarcodeResultField] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('results') as string
    );

    barcodeResults.forEach((result) => {
      this.listItems.push({
        mainResult: result,
        formattedResult: result.formattedResult
          ? this.getFormattedResult(result.formattedResult)
          : 'N/A',
      });
    });
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  private getFormattedResult(formattedResult: GenericDocument): string {
    // formattedResult can be wrapped to strongly typed document
    switch (formattedResult.type.name as RootTypeName) {
      case 'BoardingPass':
        const boardingPass = new BoardingPass(formattedResult);
        return JSON.stringify(boardingPass, null, 2);
      case 'SwissQR':
        const swissQR = new SwissQR(formattedResult);
        return JSON.stringify(swissQR, null, 2);

      // ....
    }

    // or used as generic document
    return JSON.stringify(formattedResult, null, 2);
  }
}
