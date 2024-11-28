import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'image-results/:imageUrls',
    loadComponent: () =>
      import('./results/image-results/image-results.page').then(
        (m) => m.ImageResultsPage
      ),
  },
  {
    path: 'legacy-barcode-results/:results',
    loadComponent: () =>
      import(
        './results/legacy-barcode-results/legacy-barcode-results.page'
      ).then((m) => m.LegacyBarcodeResultsPage),
  },
  {
    path: 'barcode-results/:results',
    loadComponent: () =>
      import('./results/barcode-results/barcode-results.page').then(
        (m) => m.BarcodeResultsPage
      ),
  },
  {
    path: 'barcode-formats',
    loadComponent: () =>
      import('./settings/barcode-formats/barcode-formats.page').then(
        (m) => m.BarcodeFormatsPage
      ),
  },
  {
    path: 'barcode-document-formats',
    loadComponent: () =>
      import(
        './settings/barcode-document-formats/barcode-document-formats.page'
      ).then((m) => m.BarcodeDocumentFormatsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
