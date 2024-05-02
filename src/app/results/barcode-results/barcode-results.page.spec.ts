import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeResultsPage } from './barcode-results.page';

describe('BarcodeResultsPage', () => {
  let component: BarcodeResultsPage;
  let fixture: ComponentFixture<BarcodeResultsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
