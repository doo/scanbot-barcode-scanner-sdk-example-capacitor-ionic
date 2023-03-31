import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import ScanbotBarcodeSdk, { BarcodeScannerConfiguration } from 'cordova-plugin-scanbot-barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  // @ts-ignore
  private SDK = ScanbotBarcodeSdk.promisify();

  constructor() {}

  async startBarcodeScanner() {
    const licenseInfo = await this.SDK.getLicenseInfo();
    if (!licenseInfo.isLicenseValid) {
      // see licenseInfo.licenseStatus for more details
      alert('Invalid or expired (trial) license!\n\n' + JSON.stringify(licenseInfo));
      return;
    }

    const configs: BarcodeScannerConfiguration = {
      topBarBackgroundColor: '#c8193c',
      cancelButtonTitle: 'Abort',
      //barcodeFormats: ['QR_CODE', 'EAN_13', 'EAN_8'],
      // see further configs...
    };
    const result = await this.SDK.startBarcodeScanner(configs);
    if (result.status === 'OK') {
      alert(`${result.barcodes![0].type}: ${result.barcodes![0].text}`);
    }
  }
}
