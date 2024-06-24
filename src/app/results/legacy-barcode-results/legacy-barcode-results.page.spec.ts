import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegacyBarcodeResultsPage } from './legacy-barcode-results.page';

describe('LegacyBarcodeResultsPage', () => {
  let component: LegacyBarcodeResultsPage;
  let fixture: ComponentFixture<LegacyBarcodeResultsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyBarcodeResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
