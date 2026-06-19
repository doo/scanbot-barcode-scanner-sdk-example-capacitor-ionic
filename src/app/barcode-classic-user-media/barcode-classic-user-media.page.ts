import { Component, inject, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ScanbotBarcodeScannerViewComponent } from '../scanbot-barcode-scanner-view/scanbot-barcode-scanner-view.component';
import { BarcodeItem, BarcodeScannerResult } from 'capacitor-plugin-scanbot-barcode-scanner-sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barcode-classic-user-media',
  templateUrl: './barcode-classic-user-media.page.html',
  styleUrls: ['./barcode-classic-user-media.page.scss'],
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
    ScanbotBarcodeScannerViewComponent,
  ],
})
export class BarcodeClassicUserMediaPage implements OnInit {
  router = inject(Router);
  scanResults: BarcodeItem[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  onError(error: Error) {
    alert(error);
  }

  onBarcodeResult(barcodes: BarcodeScannerResult) {
    this.ngZone.run(() => {
      this.scanResults = barcodes.barcodes;
    });
  }
}
