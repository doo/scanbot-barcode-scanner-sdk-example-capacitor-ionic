import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegacyRtuBarcodeScannerFeatureComponent } from './legacy-rtu-barcode-scanner-feature.component';

describe('LegacyRtuBarcodeScannerFeatureComponent', () => {
  let component: LegacyRtuBarcodeScannerFeatureComponent;
  let fixture: ComponentFixture<LegacyRtuBarcodeScannerFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LegacyRtuBarcodeScannerFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegacyRtuBarcodeScannerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
