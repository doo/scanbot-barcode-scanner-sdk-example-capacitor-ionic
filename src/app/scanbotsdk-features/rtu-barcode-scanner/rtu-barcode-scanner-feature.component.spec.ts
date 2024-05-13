import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuBarcodeScannerFeatureComponent } from './rtu-barcode-scanner-feature.component';

describe('RtuBarcodeScannerFeatureComponent', () => {
  let component: RtuBarcodeScannerFeatureComponent;
  let fixture: ComponentFixture<RtuBarcodeScannerFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuBarcodeScannerFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuBarcodeScannerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
