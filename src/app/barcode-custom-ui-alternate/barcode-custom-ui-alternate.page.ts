import { afterEveryRender, Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';
import {
  BarcodeCustomUIComponent,
  BarcodeFormatCommonConfiguration,
  BarcodeItem,
  BarcodeScannerConfiguration,
  ScannerViewFrame,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-barcode-custom-ui-alternate',
  templateUrl: './barcode-custom-ui-alternate.page.html',
  styleUrls: ['./barcode-custom-ui-alternate.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonBackButton,
    IonButtons,
  ],
})
export class BarcodeCustomUiAlternatePage {
  selectedBarcodes: BarcodeItem[] = [];

  private navCtrl = inject(NavController);
  private scanbotUtils = inject(ScanbotUtils);

  private barcodeCustomUIComponent = new BarcodeCustomUIComponent();
  private isAttached = false;
  private currentPosition: ScannerViewFrame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(private ngZone: NgZone) {
    /*
     *  `afterEveryRender` runs after each paint, so the component can react to frame changes.
     *  The app can update through resize observers, route events, or other mechanisms instead.
     */
    afterEveryRender(() => {
      if (this.isAttached) {
        const current = this.extractRect();
        if (this.hasMoved(current, this.currentPosition)) {
          this.barcodeCustomUIComponent.updateScannerViewFrame(current);
          this.currentPosition = current;
        }
      }
    });
  }

  async ionViewDidEnter() {
    if (!this.isAttached) {
      const currentPosition = this.extractRect();
      this.barcodeCustomUIComponent
        .attachScannerAtFrame(
          currentPosition,
          {
            onBarcodeScannerResult: (result) => {
              // Handle the barcode scanner result here
            },
            onBarcodeTap: (barcode) => {
              this.ngZone.run(() => {
                this.selectedBarcodes = [barcode];
              });
            },
            onError: (error) => {
              alert(`Error: ${error.message}`);
            },
          },
          {
            scannerConfiguration: new BarcodeScannerConfiguration({
              barcodeFormatConfigurations: [
                new BarcodeFormatCommonConfiguration({
                  formats: await this.scanbotUtils.getAcceptedBarcodeFormats(),
                }),
              ],
              extractedDocumentFormats: await this.scanbotUtils.getAcceptedBarcodeDocumentFormats(),
            }),
            overlayConfiguration: {
              overlayEnabled: true,
            },
          },
        )
        .then(() => {
          this.isAttached = true;
          this.currentPosition = currentPosition;
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    }
  }

  async ionViewWillLeave() {
    this.isAttached = false;
    await this.barcodeCustomUIComponent.detachScannerView();
  }

  // Button methods

  onClear() {
    this.selectedBarcodes = [];
  }

  async onSubmit() {
    if (this.selectedBarcodes.length > 0) {
      const resultContainer = await Promise.all(
        this.selectedBarcodes.map(async (item) => ({
          ...(await item.serialize()),
          count: 1,
        })),
      );

      await this.navCtrl.navigateForward(['/barcode-results', JSON.stringify(resultContainer)], {
        replaceUrl: true,
      });
    }
  }

  // Helpers
  // Utility for extracting the div's frame
  private extractRect(): ScannerViewFrame {
    const div = document.getElementById('barcode-view-alternate');
    if (!div) {
      return {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    const rect = div.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  }

  private hasMoved(current: ScannerViewFrame, lastPosition: ScannerViewFrame) {
    return (
      current.x !== lastPosition.x ||
      current.y !== lastPosition.y ||
      current.width !== lastPosition.width ||
      current.height !== lastPosition.height
    );
  }
}
