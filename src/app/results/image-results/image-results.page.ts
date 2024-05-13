import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonTitle,
  IonBackButton,
  IonToolbar,
  IonRow,
  IonCol,
  IonImg,
  IonButtons,
} from '@ionic/angular/standalone';

import { CommonUtils } from 'src/app/utils/common-utils';

@Component({
  selector: 'app-image-results',
  templateUrl: './image-results.page.html',
  styleUrls: ['./image-results.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonHeader,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonRow,
    IonCol,
    IonImg,
    IonButtons,
    CommonModule,
    FormsModule,
  ],
})
export class ImageResultsPage implements OnInit {
  private utils = inject(CommonUtils);
  private activatedRoute = inject(ActivatedRoute);

  convertedImageUrls: string[] = [];

  constructor() {}

  async ngOnInit() {
    const originalImageUrls: string[] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('imageUrls') as string
    );

    originalImageUrls.forEach((url, index) => {
      console.log(`Image ${index}: ${url}`);

      this.convertedImageUrls.push(Capacitor.convertFileSrc(url));
    });
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }
}
