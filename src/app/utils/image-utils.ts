import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ImageUtils {
  constructor() {}

  async selectImageFromLibrary(): Promise<string> {
    let photo;
    let pickImageErrorMessage;

    try {
      photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        saveToGallery: false,
        correctOrientation: true,
        source: CameraSource.Photos,
      });
    } catch (error: any) {
      pickImageErrorMessage = error.message;
    }

    if (photo?.path) {
      return photo.path;
    } else {
      throw new Error(
        `No image picked${pickImageErrorMessage ? '. ' + pickImageErrorMessage : ''}`,
      );
    }
  }
}
