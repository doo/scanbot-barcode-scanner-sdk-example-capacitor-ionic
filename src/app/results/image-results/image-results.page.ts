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
  IonImg,
  IonButtons,
} from '@ionic/angular/standalone';

import { CommonUtils } from 'src/app/utils/common-utils';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-image-results',
  templateUrl: './image-results.page.html',
  styleUrls: ['./image-results.page.scss'],
  imports: [
    IonContent,
    IonGrid,
    IonHeader,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonRow,
    IonImg,
    IonButtons,
    CommonModule,
    FormsModule,
  ],
})
export class ImageResultsPage implements OnInit {
  private utils = inject(CommonUtils);
  private scanbotUtils = inject(ScanbotUtils);
  private activatedRoute = inject(ActivatedRoute);

  convertedImageUrls: string[] = [];

  constructor() {}

  async ngOnInit() {
    const originalImageUrls: string[] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('imageUrls') as string,
    );

    originalImageUrls.forEach(async (url) => {
      if (AppComponent.FILE_ENCRYPTION_ENABLED) {
        const decryptedImage = `data:image/jpeg;base64,${await this.scanbotUtils.decryptImageUrl(url)}`;
        this.convertedImageUrls.push(decryptedImage);
      } else {
        this.convertedImageUrls.push(Capacitor.convertFileSrc(url));
      }
    });
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }
}
