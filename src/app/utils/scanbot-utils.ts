import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import {
  BarcodeDocumentFormat,
  BarcodeFormat,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

export interface Feature {
  id: FeatureId;
  title: string;
}

export enum FeatureId {
  ScanBarcodes,
  ScanBatchBarcodes,
  DetectBarcodesOnImage,
  ExtractImagesFromPdf,
  LicenseInfo,
  StorageCleanup,
}

export interface BarcodeSetting {
  format: BarcodeFormat;
  accepted: boolean;
}

export interface BarcodeDocumentSetting {
  format: BarcodeDocumentFormat;
  accepted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ScanbotUtils {
  private readonly BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY =
    'barcodeDocumentFormatsEnabled';

  constructor() {}

  async getBarcodeSettings(): Promise<BarcodeSetting[]> {
    return [
      {
        format: 'AZTEC',
        accepted: await this.isBarcodeFormatAccepted('AZTEC'),
      },
      {
        format: 'CODABAR',
        accepted: await this.isBarcodeFormatAccepted('CODABAR'),
      },
      {
        format: 'CODE_25',
        accepted: await this.isBarcodeFormatAccepted('CODE_25'),
      },
      {
        format: 'CODE_39',
        accepted: await this.isBarcodeFormatAccepted('CODE_39'),
      },
      {
        format: 'CODE_93',
        accepted: await this.isBarcodeFormatAccepted('CODE_93'),
      },
      {
        format: 'CODE_128',
        accepted: await this.isBarcodeFormatAccepted('CODE_128'),
      },
      {
        format: 'DATA_MATRIX',
        accepted: await this.isBarcodeFormatAccepted('DATA_MATRIX'),
      },
      {
        format: 'EAN_8',
        accepted: await this.isBarcodeFormatAccepted('EAN_8'),
      },
      {
        format: 'EAN_13',
        accepted: await this.isBarcodeFormatAccepted('EAN_13'),
      },
      {
        format: 'ITF',
        accepted: await this.isBarcodeFormatAccepted('ITF'),
      },
      {
        format: 'PDF_417',
        accepted: await this.isBarcodeFormatAccepted('PDF_417'),
      },
      {
        format: 'QR_CODE',
        accepted: await this.isBarcodeFormatAccepted('QR_CODE'),
      },
      {
        format: 'MICRO_QR_CODE',
        accepted: await this.isBarcodeFormatAccepted('MICRO_QR_CODE'),
      },
      {
        format: 'RSS_14',
        accepted: await this.isBarcodeFormatAccepted('RSS_14'),
      },
      {
        format: 'RSS_EXPANDED',
        accepted: await this.isBarcodeFormatAccepted('RSS_EXPANDED'),
      },
      {
        format: 'UPC_A',
        accepted: await this.isBarcodeFormatAccepted('UPC_A'),
      },
      {
        format: 'UPC_E',
        accepted: await this.isBarcodeFormatAccepted('UPC_E'),
      },
      {
        format: 'MSI_PLESSEY',
        accepted: await this.isBarcodeFormatAccepted('MSI_PLESSEY'),
      },
      {
        format: 'IATA_2_OF_5',
        accepted: await this.isBarcodeFormatAccepted('IATA_2_OF_5'),
      },
      {
        format: 'INDUSTRIAL_2_OF_5',
        accepted: await this.isBarcodeFormatAccepted('INDUSTRIAL_2_OF_5'),
      },
      {
        format: 'USPS_INTELLIGENT_MAIL',
        accepted: await this.isBarcodeFormatAccepted('USPS_INTELLIGENT_MAIL'),
      },
      {
        format: 'ROYAL_MAIL',
        accepted: await this.isBarcodeFormatAccepted('ROYAL_MAIL'),
      },
      {
        format: 'JAPAN_POST',
        accepted: await this.isBarcodeFormatAccepted('JAPAN_POST'),
      },
      {
        format: 'ROYAL_TNT_POST',
        accepted: await this.isBarcodeFormatAccepted('ROYAL_TNT_POST'),
      },
      {
        format: 'AUSTRALIA_POST',
        accepted: await this.isBarcodeFormatAccepted('AUSTRALIA_POST'),
      },
      {
        format: 'DATABAR_LIMITED',
        accepted: await this.isBarcodeFormatAccepted('DATABAR_LIMITED'),
      },
      {
        format: 'GS1_COMPOSITE',
        accepted: await this.isBarcodeFormatAccepted('GS1_COMPOSITE'),
      },
    ];
  }

  async getAcceptedBarcodeFormats(): Promise<BarcodeFormat[]> {
    return (await this.getBarcodeSettings())
      .filter((x) => x.accepted)
      .map((x) => x.format);
  }

  // Default is undefined (true). Only if explicitly is set to false, then it will be disabled.
  private async isBarcodeFormatAccepted(
    barcodeFormat: BarcodeFormat
  ): Promise<boolean> {
    return (
      (await Preferences.get({ key: barcodeFormat.toString() })).value !==
      'false'
    );
  }

  async setBarcodeFormatAccepted(
    barcodeFormat: BarcodeFormat,
    accepted: boolean
  ) {
    await Preferences.set({
      key: barcodeFormat.toString(),
      value: accepted.toString(),
    });
  }

  async getBarcodeDocumentSettings(): Promise<BarcodeDocumentSetting[]> {
    return [
      {
        format: 'AAMVA',
        accepted: await this.isBarcodeDocumentFormatAccepted('AAMVA'),
      },
      {
        format: 'BOARDING_PASS',
        accepted: await this.isBarcodeDocumentFormatAccepted('BOARDING_PASS'),
      },
      {
        format: 'DE_MEDICAL_PLAN',
        accepted: await this.isBarcodeDocumentFormatAccepted('DE_MEDICAL_PLAN'),
      },
      {
        format: 'MEDICAL_CERTIFICATE',
        accepted: await this.isBarcodeDocumentFormatAccepted(
          'MEDICAL_CERTIFICATE'
        ),
      },
      {
        format: 'ID_CARD_PDF_417',
        accepted: await this.isBarcodeDocumentFormatAccepted('ID_CARD_PDF_417'),
      },
      {
        format: 'SEPA',
        accepted: await this.isBarcodeDocumentFormatAccepted('SEPA'),
      },
      {
        format: 'SWISS_QR',
        accepted: await this.isBarcodeDocumentFormatAccepted('SWISS_QR'),
      },
      {
        format: 'VCARD',
        accepted: await this.isBarcodeDocumentFormatAccepted('VCARD'),
      },
      {
        format: 'GS1',
        accepted: await this.isBarcodeDocumentFormatAccepted('GS1'),
      },
    ];
  }

  async getAcceptedBarcodeDocumentFormats(): Promise<BarcodeDocumentFormat[]> {
    const filterIsDisabled =
      !(await this.isBarcodeDocumentFormatsFilterEnabled());

    return (await this.getBarcodeDocumentSettings())
      .filter((x) => x.accepted || filterIsDisabled)
      .map((x) => x.format);
  }

  // Default is undefined (true). Only if explicitly is set to false, then it will be disabled.
  private async isBarcodeDocumentFormatAccepted(
    barcodeDocumentFormat: BarcodeDocumentFormat
  ): Promise<boolean> {
    return (
      (await Preferences.get({ key: barcodeDocumentFormat.toString() }))
        .value !== 'false'
    );
  }

  async setBarcodeDocumentFormatAccepted(
    barcodeDocumentFormat: BarcodeDocumentFormat,
    accepted: boolean
  ) {
    await Preferences.set({
      key: barcodeDocumentFormat.toString(),
      value: accepted.toString(),
    });
  }

  // Default is undefined (false). Only if explicitly is set to true, then it will be enabled.
  async isBarcodeDocumentFormatsFilterEnabled(): Promise<boolean> {
    return (
      (
        await Preferences.get({
          key: this.BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY,
        })
      ).value === 'true'
    );
  }

  async setBarcodeDocumentFormatsFilterEnabled(enabled: boolean) {
    await Preferences.set({
      key: this.BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY,
      value: enabled.toString(),
    });
  }
}
