import { afterEveryRender, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  BarcodeCustomUIComponent,
  BarcodeItem,
  ScannerViewFrame,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';
import { addIcons } from 'ionicons';
import {
  barcodeOutline,
  cameraReverseOutline,
  flashlightOutline,
  listOutline,
} from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';

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
    IonBackButton,
    IonButtons,
  ],
})
export class BarcodeCustomUiAlternatePage {
  scanResults: BarcodeItem[] = [];
  private barcodeCustomUIComponent = new BarcodeCustomUIComponent();
  private isAttached = false;
  private currentPosition: ScannerViewFrame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(private ngZone: NgZone) {
    addIcons({ cameraReverseOutline, flashlightOutline, listOutline, barcodeOutline });

    if (Capacitor.isPluginAvailable('ScanbotCustomUI')) {
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
  }

  async ionViewDidEnter() {
    if (Capacitor.isPluginAvailable('ScanbotCustomUI') && !this.isAttached) {
      const currentPosition = this.extractRect();
      this.barcodeCustomUIComponent
        .attachScannerAtFrame(currentPosition, {
          onBarcodeScannerResult: (result) => {
            this.ngZone.run(() => {
              this.scanResults = result;
            });
          },
          onBarcodeTap: (barcode) => {
            this.ngZone.run(() => {
              this.scanResults = [barcode];
            });
          },
          onError: (error) => {
            alert(`Error: ${error.message}`);
          },
        })
        .then(() => {
          this.isAttached = true;
          this.currentPosition = currentPosition;
        });
    }
  }

  async ionViewWillLeave() {
    this.isAttached = false;
    await this.barcodeCustomUIComponent.detachScannerView();
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
    return current.x !== lastPosition.x || current.y !== lastPosition.y;
  }
}
