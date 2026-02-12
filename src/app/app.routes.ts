import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'barcode-results/:results',
    loadComponent: () =>
      import('./barcode-results/barcode-results.page').then((m) => m.BarcodeResultsPage),
  },
  {
    path: 'barcode-formats',
    loadComponent: () =>
      import('./settings/barcode-formats/barcode-formats.page').then((m) => m.BarcodeFormatsPage),
  },
  {
    path: 'barcode-document-formats',
    loadComponent: () =>
      import('./settings/barcode-document-formats/barcode-document-formats.page').then(
        (m) => m.BarcodeDocumentFormatsPage,
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
