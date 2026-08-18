import {
  afterEveryRender,
  afterNextRender,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  selector: 'app-barcode-classic-alternate',
  templateUrl: './barcode-classic-alternate.page.html',
  styleUrls: ['./barcode-classic-alternate.page.scss'],
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
export class BarcodeClassicAlternatePage implements OnInit, OnDestroy {
  scanResults: BarcodeItem[] = [];
  private barcodeCustomUIComponent = new BarcodeCustomUIComponent();

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
       *  `afterNextRender` runs once after the next paint, so the component attaches when layout bounds are ready.
       *  The app can attach via other lifecycle hooks or custom events if that timing fits better.
       */
      afterNextRender(() => {
        this.barcodeCustomUIComponent.attachScannerAtFrame(this.extractRect(), {
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
        });
        this.currentPosition = this.extractRect();
      });

      /*
       *  `afterEveryRender` runs after each paint, so the component can react to frame changes.
       *  The app can update through resize observers, route events, or other mechanisms instead.
       */
      afterEveryRender(() => {
        const current = this.extractRect();
        if (this.hasMoved(current, this.currentPosition)) {
          this.barcodeCustomUIComponent.updateScannerViewFrame(current);
          this.currentPosition = current;
        }
      });
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.barcodeCustomUIComponent.detachScannerView();
  }

  // Helpers
  // Utility for extracting the div's frame
  private extractRect(): ScannerViewFrame {
    const div = document.getElementById('barcode-view');
    if (!div) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
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
