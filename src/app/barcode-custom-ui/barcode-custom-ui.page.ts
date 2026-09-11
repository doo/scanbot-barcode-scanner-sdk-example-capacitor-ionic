import { afterEveryRender, afterNextRender, Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  BarcodeCustomUIComponent,
  BarcodeItem,
  ScannerViewFrame,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';
import { Capacitor } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { barcodeOutline, copyOutline, flashlightOutline, listOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barcode-custom-ui',
  templateUrl: './barcode-custom-ui.page.html',
  styleUrls: ['./barcode-custom-ui.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonFab,
    IonModal,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonFabButton,
    IonBackButton,
    IonButtons,
  ],
})
export class BarcodeCustomUIPage {
  scanResults: BarcodeItem[] = [];
  isResultModalOpen = false;

  private router = inject(Router);
  private barcodeCustomUIComponent = new BarcodeCustomUIComponent();
  private isAttached = false;
  private currentPosition: ScannerViewFrame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private arOverlayEnabled = false;
  private flashEnabled = false;
  private finderEnabled = false;

  constructor(private ngZone: NgZone) {
    addIcons({ copyOutline, flashlightOutline, listOutline, barcodeOutline });

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
              this.showResultModal(true);
              this.scanResults = result;
            });
          },
          onError: (error) => {
            alert(`Error: ${error.message}`);
          },
        })
        .then(() => {
          this.isAttached = true;
          this.currentPosition = this.extractRect();
        });
    }
  }

  async ionViewWillLeave() {
    this.isAttached = false;
    await this.barcodeCustomUIComponent.detachScannerView();
  }

  // Button methods

  onArOverlayToggle() {
    this.arOverlayEnabled = !this.arOverlayEnabled;

    this.barcodeCustomUIComponent.configuration.setOverlayConfiguration({
      overlayEnabled: this.arOverlayEnabled,
      textFormat: 'CODE_AND_TYPE',
      polygonColor: '#00CFA633',
      textColor: '#000000',
      textContainerColor: '#00CFA6CC',
      strokeColor: '#00CFA6CC',
    });
  }

  onFlashLightToggle() {
    this.flashEnabled = !this.flashEnabled;

    this.barcodeCustomUIComponent.configuration.setCameraConfiguration({
      flashEnabled: this.flashEnabled,
    });
  }

  onFinderToggle() {
    this.finderEnabled = !this.finderEnabled;

    this.barcodeCustomUIComponent.configuration.setFinderConfiguration({
      viewFinderEnabled: this.finderEnabled,
    });
  }

  onClearAll() {
    this.scanResults = [];
  }

  onSubmit() {
    this.router.navigate(['/home']);
  }

  showResultModal(show: boolean) {
    this.isResultModalOpen = show;
  }

  // Helpers
  // Utility for extracting the div's frame
  private extractRect(): ScannerViewFrame {
    const div = document.getElementById('barcode-view');
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
      sendToBack: true,
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
