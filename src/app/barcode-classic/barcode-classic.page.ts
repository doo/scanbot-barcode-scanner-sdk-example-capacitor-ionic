import {
  afterEveryRender,
  afterNextRender,
  Component,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  selector: 'app-barcode-classic',
  templateUrl: './barcode-classic.page.html',
  styleUrls: ['./barcode-classic.page.scss'],
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
export class BarcodeClassicPage implements OnInit, OnDestroy {
  scanResults: BarcodeItem[] = [];

  private router = inject(Router);
  private barcodeCustomUIComponent = new BarcodeCustomUIComponent();
  isResultModalOpen = true;

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
          this.barcodeCustomUIComponent.updateScannerViewFrame(this.extractRect());
          this.currentPosition = current;
        }
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.barcodeCustomUIComponent.detachScannerView();
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
