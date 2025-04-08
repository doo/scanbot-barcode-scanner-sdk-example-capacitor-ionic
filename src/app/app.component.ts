import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { StatusBar, Style } from '@capacitor/status-bar';
import { environment } from 'src/environments/environment';

import { Colors } from 'src/theme/theme';

import {
  ScanbotBarcodeSDK,
  ScanbotBarcodeSdkConfiguration,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  /*
   * TODO add the license key here.
   * Please note: The Scanbot Barcode Scanner SDK will run without a license key for one minute per session!
   * After the trial period has expired, all SDK functions and UI components will stop working.
   * You can get a free "no-strings-attached" trial license.
   * Please submit the trial license form (https://scanbot.io/trial/) on our website using
   * the app identifier "io.scanbot.example.sdk.barcode.capacitor" of this example app
   * or of your app (see capacitor.config.ts).
   */
  private readonly licenseKey = '';

  /*
   * !! Please read note !!
   * It is strongly recommended to use the default (secure) storage location of the Scanbot Barcode Scanner SDK.
   * However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot Barcode Scanner SDK by a custom storage directory.
   *
   * For more details about the storage system of the Scanbot Barcode Scanner SDK Capacitor Module please see our docs:
   * - https://docs.scanbot.io/barcode-scanner-sdk/capacitor/barcode-scanner/storage-and-encryption/
   *
   * For more details about the file system on Android and iOS we also recommend to check out:
   * - https://developer.android.com/training/data-storage
   * - https://developer.apple.com/documentation/foundation/filemanager
   */
  private readonly storageBaseDirectoryUri = Filesystem.getUri({
    path: 'my-custom-storage',
    directory: Directory.External,
  });

  public static readonly FILE_ENCRYPTION_ENABLED: boolean = false;

  constructor() {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: Colors.scanbotRed });
    StatusBar.setOverlaysWebView({ overlay: false });
  }

  ngOnInit(): void {
    this.initScanbotBarcodeScannerSdk();
  }

  private async initScanbotBarcodeScannerSdk() {
    const config: ScanbotBarcodeSdkConfiguration = {
      licenseKey: this.licenseKey,
      loggingEnabled: !environment.production,
      // storageBaseDirectory: (await this.storageBaseDirectoryUri).uri, // Custom storage path
      fileEncryptionMode: AppComponent.FILE_ENCRYPTION_ENABLED ? 'AES256' : undefined,
      fileEncryptionPassword: AppComponent.FILE_ENCRYPTION_ENABLED
        ? 'SomeSecretPa$$w0rdForFileEncryption'
        : undefined,
      // see further config parameters
    };

    try {
      const result = await ScanbotBarcodeSDK.initializeSdk(config);
      console.log(result);
    } catch (error: any) {
      console.error(error);
    }
  }
}
