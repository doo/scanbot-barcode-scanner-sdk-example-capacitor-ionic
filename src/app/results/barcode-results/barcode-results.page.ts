import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { CommonUtils } from 'src/app/utils/common-utils';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';

import {
  AAMVA,
  BarcodeDocumentModelRootType,
  BarcodeItem,
  BoardingPass,
  DeepPartial,
  DEMedicalPlan,
  GenericDocument,
  GS1,
  HIBC,
  IDCardPDF417,
  MedicalCertificate,
  SEPA,
  SwissQR,
  VCard,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

export type BarcodeResultContainer = DeepPartial<BarcodeItem> & {
  count: number;
};

interface BarcodeResultListItem {
  barcode: BarcodeItem;
  count: number;
}

@Component({
  selector: 'app-barcode-results',
  templateUrl: './barcode-results.page.html',
  styleUrls: ['./barcode-results.page.scss'],
  imports: [
    IonBackButton,
    IonListHeader,
    IonButtons,
    IonLabel,
    IonItem,
    IonImg,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class BarcodeResultsPage implements OnInit {
  listItems: BarcodeResultListItem[] = [];
  private utils = inject(CommonUtils);
  private scanbotUtils = inject(ScanbotUtils);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    const barcodeResultContainers: [BarcodeResultContainer] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('results') as string,
    );

    barcodeResultContainers.forEach((result) => {
      this.listItems.push({
        barcode: new BarcodeItem(result),
        count: result.count,
      });
    });
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  getExtractedDocument(extractedDocument?: GenericDocument | null): string {
    if (!extractedDocument) {
      return 'N/A';
    }
    /**
     * Fields from Generic Document could be managed in the following ways:
     *
     * 1. Extract all the fields from the Generic Document itself
     * 2. Use the wrappers provided by ScanbotSDK and use the desired properties directly
     *
     */
    const useWrappers = true;

    if (useWrappers) {
      switch (extractedDocument.type.name as BarcodeDocumentModelRootType) {
        case 'BoardingPass': {
          const boardingPass = new BoardingPass(extractedDocument);
          return (
            `Name: ${boardingPass.name.value?.text} \n` +
            `Number Of Legs: ${boardingPass.numberOfLegs.value?.text}`
          );
          // ... read all properties needed
        }
        case 'SwissQR': {
          const swissQR = new SwissQR(extractedDocument);
          return (
            `Name: ${swissQR.majorVersion.value?.text} \n` +
            `Amount: ${swissQR.amount?.value?.text}`
          );
          // ... read all properties needed
        }
        case 'AAMVA': {
          const aamva = new AAMVA(extractedDocument);
          return (
            `Issuer Identification Number: ${aamva.issuerIdentificationNumber.value?.text} \n` +
            `Aamva version number: ${aamva.version.value?.text}`
          );
          // ... read all properties needed
        }
        case 'GS1': {
          const gs1 = new GS1(extractedDocument);
          return gs1.elements
            .map(
              (field) =>
                `Application ID: ${field.applicationIdentifier.value?.text} \n` +
                `Description: ${field.elementDescription.value?.text} \n`,
            )
            .join('\n');
          // ... read all properties needed
        }
        case 'IDCardPDF417': {
          const idCardPDF417 = new IDCardPDF417(extractedDocument);
          return (
            `First Name: ${idCardPDF417.firstName.value?.text} \n` +
            `Last Name: ${idCardPDF417.lastName.value?.text}`
          );
          // ... read all properties needed
        }
        case 'MedicalCertificate': {
          const medicalCert = new MedicalCertificate(extractedDocument);
          return (
            `First Name: ${medicalCert.firstName?.value?.text} \n` +
            `Last Name: ${medicalCert.lastName?.value?.text}`
          );
          // ... read all properties needed
        }
        case 'SEPA': {
          const sepa = new SEPA(extractedDocument);
          return `Version: ${sepa.version.value?.text} \n` + `Amount: ${sepa.amount?.value?.text}`;
          // ... read all properties needed
        }
        case 'VCard': {
          const vCard = new VCard(extractedDocument);
          return (
            `First Name: ${vCard.firstName?.rawValue?.value?.text} \n` +
            `Birthday: ${vCard.birthday?.rawValue?.value?.text}`
          );
          // ... read all properties needed
        }
        case 'HIBC': {
          const hibc = new HIBC(extractedDocument);
          return (
            `Quantity: ${hibc.quantity?.value?.text} \n` +
            `Date Of Manufacture: ${hibc.dateOfManufacture?.value?.text}`
          );
          // ... read all properties needed
        }
        case 'DEMedicalPlan': {
          const deMedicalPlan = new DEMedicalPlan(extractedDocument);
          return (
            `Patient First Name: ${deMedicalPlan.patient.firstName?.value?.text} \n` +
            `Patient Last Name: ${deMedicalPlan.patient.lastName?.value?.text}`
          );
          // ... read all properties needed
        }
        default:
          return JSON.stringify(extractedDocument, null, 2);
      }
    } else {
      return this.scanbotUtils
        .extractGenericDocumentFields(extractedDocument)
        .map((field) => `${field.type.name}: ${field.value?.text}`)
        .join('\n');
    }
  }
}
