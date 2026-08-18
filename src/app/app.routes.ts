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
    path: 'barcode-classic',
    loadComponent: () =>
      import('./barcode-classic/barcode-classic.page').then((m) => m.BarcodeClassicPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'barcode-classic-alternate',
    loadComponent: () =>
      import('./barcode-classic-alternate/barcode-classic-alternate.page').then(
        (m) => m.BarcodeClassicAlternatePage,
      ),
  },
];
