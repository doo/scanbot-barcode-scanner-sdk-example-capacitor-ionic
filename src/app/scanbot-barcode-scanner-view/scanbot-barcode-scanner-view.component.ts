import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  autorelease,
  BarcodeScannerConfiguration,
  BarcodeScannerResult,
  ImageRef,
  ScanbotBarcode,
} from 'capacitor-plugin-scanbot-barcode-scanner-sdk';

@Component({
  selector: 'app-scanbot-barcode-scanner-view',
  templateUrl: './scanbot-barcode-scanner-view.component.html',
  styleUrls: ['./scanbot-barcode-scanner-view.component.scss'],
  standalone: true,
})
export class ScanbotBarcodeScannerViewComponent implements OnInit, OnDestroy {
  video!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;

  barcodeConfiguration = new BarcodeScannerConfiguration({
    processingMode: 'LIVE',
  });

  @Output() onBarcodeResult = new EventEmitter<BarcodeScannerResult>();
  @Output() onError = new EventEmitter<Error>();

  ngOnInit() {
    this.video = document.querySelector('video')!;
    this.canvas = document.createElement('canvas')!;

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
          backgroundBlur: true,
        },
        audio: false,
      })
      .then((localMediaStream) => {
        this.video!.srcObject = localMediaStream;

        this.canvas.width = this.video!.videoWidth;
        this.canvas.height = this.video!.videoHeight;
      })
      .catch((error) => {
        this.onError.emit(error);
      });

    this.video.addEventListener('loadedmetadata', () => {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;

      this.video.requestVideoFrameCallback(this.onFrame.bind(this));
    });
  }

  ngOnDestroy() {
    const stream = this.video?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
  }

  async onFrame() {
    const ctx = this.canvas.getContext('2d');
    ctx?.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    const dataUrl = this.canvas.toDataURL('image/png');
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');

    await autorelease(async () => {
      try {
        const ref = await ImageRef.fromEncodedBuffer(base64);
        if (ref == null) return;

        const result = await ScanbotBarcode.scanFromImage({
          image: ref,
          configuration: this.barcodeConfiguration,
        });

        ref.release();

        this.onBarcodeResult.emit(result);
      } catch (e: any) {
        this.onError.emit(new Error(e.message || 'An unexpected error occurred.'));
      }
    });

    this.video.requestVideoFrameCallback(this.onFrame.bind(this));
  }
}
