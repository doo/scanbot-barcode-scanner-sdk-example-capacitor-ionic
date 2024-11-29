import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

import {
  BarcodeDocumentFormat,
  BarcodeFormat,
  Field,
  GenericDocument,
  ScanbotBarcodeSDK,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

export interface Feature {
  id: FeatureId;
  title: string;
}

export enum FeatureId {
  RtuSingleScanning,
  RtuMultiScanning,
  RtuMultiArScanning,
  RtuFindAndPickScanning,
  DetectBarcodesOnImage,
  ExtractImagesFromPdf,
  LicenseInfo,
  StorageCleanup,
  LegacyScanBarcodes,
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

  barcodeFormats: Record<BarcodeFormat, boolean> = {
    AZTEC: true,
    CODABAR: true,
    CODE_25: true,
    CODE_39: true,
    CODE_93: true,
    CODE_128: true,
    DATA_MATRIX: true,
    EAN_8: true,
    EAN_13: true,
    ITF: true,
    PDF_417: true,
    QR_CODE: true,
    UPC_A: true,
    UPC_E: true,
    MSI_PLESSEY: true,
    IATA_2_OF_5: true,
    INDUSTRIAL_2_OF_5: true,
    MICRO_QR_CODE: true,
    USPS_INTELLIGENT_MAIL: true,
    ROYAL_MAIL: true,
    ROYAL_TNT_POST: true,
    JAPAN_POST: true,
    AUSTRALIA_POST: true,
    DATABAR_LIMITED: true,
    GS1_COMPOSITE: true,
    DATABAR: true,
    MICRO_PDF_417: true,
    DATABAR_EXPANDED: true,
    CODE_11: true,
    CODE_32: true,
    MAXI_CODE: true,
    RMQR_CODE: true,
  };
  private readonly BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY =
    'barcodeDocumentFormatsEnabled';

  constructor() {
  }

  async getBarcodeSettings() {
    return Promise.all(
      Object.keys(this.barcodeFormats).map(async key => ({
        format: key,
        accepted: await this.isBarcodeFormatAccepted(key as BarcodeFormat),
      } as BarcodeSetting))
    );
  }

  async getAcceptedBarcodeFormats(): Promise<BarcodeFormat[]> {
    return (await this.getBarcodeSettings())
      .filter((x) => x.accepted)
      .map((x) => x.format) as BarcodeFormat[];
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
    const filterIsEnabled = await this.isBarcodeDocumentFormatsFilterEnabled();

    if (filterIsEnabled) {
      return (await this.getBarcodeDocumentSettings())
        .filter((x) => x.accepted)
        .map((x) => x.format);
    } else {
      return [];
    }
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

  extractGenericDocumentFields(document: GenericDocument) {
    let fields: Field[] = [];

    if (document.fields.length > 0) {
      fields = fields.concat(document.fields);
    }

    if (document.children.length > 0) {
      document.children.forEach((child: GenericDocument) => {
        fields = fields.concat(this.extractGenericDocumentFields(child));
      });
    }

    return fields;
  }

  // Default is undefined (true). Only if explicitly is set to false, then it will be disabled.
  private async isBarcodeFormatAccepted(
    barcodeFormat: BarcodeFormat
  ): Promise<boolean> {
    return (
      (await Preferences.get({key: barcodeFormat.toString()})).value !==
      'false'
    );
  }

  // Default is undefined (true). Only if explicitly is set to false, then it will be disabled.
  private async isBarcodeDocumentFormatAccepted(
    barcodeDocumentFormat: BarcodeDocumentFormat
  ): Promise<boolean> {
    return (
      (await Preferences.get({key: barcodeDocumentFormat.toString()}))
        .value !== 'false'
    );
  }

  async decryptImageUrl(encryptedUrl: string): Promise<string> {
    let imageAsBase64 = ""
    try {
      imageAsBase64 = (
        await ScanbotBarcodeSDK.getImageData({
          imageFileUri: encryptedUrl
        })
      ).data ?? "";
    } catch (error: any) {
      console.error(error.message)
    }

    return imageAsBase64;
  }
}
