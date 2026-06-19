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
  IonButton,
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
  CameraModule,
  ScannerViewFrame,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';
import { Capacitor } from '@capacitor/core';
import { addIcons } from 'ionicons';
import {
  barcodeOutline,
  cameraReverseOutline,
  flashlightOutline,
  listOutline,
} from 'ionicons/icons';
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
  ],
})
export class BarcodeClassicPage implements OnInit, OnDestroy {
  scanResults: BarcodeItem[] = [];

  private router = inject(Router);
  private barcodeCustomUIComponent = new BarcodeCustomUIComponent();

  private currentPosition: ScannerViewFrame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private cameraDevice: CameraModule = 'BACK';
  private flashEnabled = false;
  private finderEnabled = false;

  constructor(private ngZone: NgZone) {
    addIcons({ cameraReverseOutline, flashlightOutline, listOutline, barcodeOutline });

    if (Capacitor.isPluginAvailable('ScanbotCustomUI')) {
      afterNextRender(() => {
        this.barcodeCustomUIComponent.attachScannerAtFrame(
          this.extractRect(),
          {
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
          },
          {
            finderConfiguration: {
              viewFinderEnabled: this.finderEnabled,
              finderOverlayColor: '#00000094',
            },
            cameraConfiguration: {
              cameraModule: this.cameraDevice,
            },
          },
        );
        this.currentPosition = this.extractRect();
      });

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

  onCameraToggle() {
    if (this.cameraDevice == 'BACK') {
      this.cameraDevice = 'FRONT';
    } else {
      this.cameraDevice = 'BACK';
    }

    this.barcodeCustomUIComponent.configuration.setCameraConfiguration({
      cameraModule: this.cameraDevice,
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

  // Helpers

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
