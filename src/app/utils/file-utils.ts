import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Injectable({
  providedIn: 'root',
})
export class FileUtils {
  constructor() {}

  async selectPdfFile(): Promise<string> {
    let pickFilesErrorMessage;

    try {
      const pdfFile = await FilePicker.pickFiles({
        types: ['application/pdf'],
        limit: 1,
        readData: false,
      });
      const pdfPath = pdfFile.files[0].path;

      if (pdfPath) {
        return pdfPath;
      }
    } catch (error: any) {
      pickFilesErrorMessage = error.message;
    }

    throw new Error(
      `No PDF file picked${pickFilesErrorMessage ? ': ' + pickFilesErrorMessage : ''}`,
    );
  }
}
