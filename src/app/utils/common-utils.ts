import { Injectable, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController, AlertOptions, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommonUtils {
  private alertController = inject(AlertController);
  private loadingController = inject(LoadingController);

  constructor() {}

  async showAlert(opts?: AlertOptions, onDismiss?: () => any) {
    const alert = await this.alertController.create(opts);
    alert.onDidDismiss().then(onDismiss);
    await alert.present();
  }

  async showResultInfo(result: string) {
    await this.showAlert({
      header: 'Result',
      message: result,
      buttons: ['OK'],
    });
  }

  async showErrorAlert(error: any, onDismiss?: () => any) {
    await this.showAlert({ header: 'Error', message: error.message, buttons: ['OK'] }, onDismiss);
  }

  async showWarningAlert(warning: string) {
    await this.showAlert({
      header: 'Warning',
      message: warning,
      buttons: ['OK'],
    });
  }

  async showInfoAlert(infoMessage: string) {
    await this.showAlert({
      header: 'Info',
      message: infoMessage,
      buttons: ['OK'],
    });
  }

  async showLoader(message?: string | undefined) {
    (
      await this.loadingController.create({
        message: message !== undefined ? message : 'Please wait ...',
      })
    ).present();
  }

  async dismissLoader() {
    try {
      await this.loadingController.dismiss();
    } catch (error) {
      /* empty */
    }
  }

  isiOSPlatform(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }
}
