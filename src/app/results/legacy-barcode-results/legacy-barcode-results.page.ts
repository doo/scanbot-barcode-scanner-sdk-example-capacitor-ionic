import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import {CommonUtils} from 'src/app/utils/common-utils';
import {ScanbotUtils} from "../../utils/scanbot-utils";

import {
  BarcodeDocumentModelRootType,
  BarcodeResultField,
  BoardingPass,
  GenericDocument,
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
  listItems: LegacyBarcodeResultListItem[] = [];
  private utils = inject(CommonUtils);
  private scanbotUtils = inject(ScanbotUtils);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
  }

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
    /**
     * Fields from Generic Document could be managed in the following ways:
     *
     * 1. Extract all the fields from the Generic Document itself
     * 2. Use the wrappers provided by ScanbotSDK and use the desired properties directly
     *
     */
    const useDynamic = true

    if (useDynamic) {
      return this.scanbotUtils.extractGenericDocumentFields(formattedResult)
        .map(field => `${field.type.name}: ${field.value?.text}`)
        .join("\n")
    } else {
      switch (formattedResult.type.name as BarcodeDocumentModelRootType) {
        case 'BoardingPass': {
          const boardingPass = new BoardingPass(formattedResult);
          return JSON.stringify(boardingPass, null, 2);
        }
        case 'SwissQR': {
          const swissQR = new SwissQR(formattedResult);
          return JSON.stringify(swissQR, null, 2);
        }
        // ....
        default:
          return JSON.stringify(formattedResult, null, 2);
      }
    }
  }
}
