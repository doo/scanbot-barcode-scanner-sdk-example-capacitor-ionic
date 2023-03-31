import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import ScanbotBarcodeSdk, { ScanbotBarcodeSDKConfiguration } from 'cordova-plugin-scanbot-barcode-scanner';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {

  // @ts-ignore
  private SDK = ScanbotBarcodeSdk.promisify();

  constructor() {
    this.initScanbotSdk();
  }

  async initScanbotSdk() {
    const options: ScanbotBarcodeSDKConfiguration = {
      licenseKey: '',
      loggingEnabled: true
    };
    try {
      const result = await this.SDK.initializeSdk(options);
      console.log(JSON.stringify(result));
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }
}
