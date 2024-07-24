import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegacyRtuBatchBarcodeScannerFeatureComponent } from './legacy-rtu-batch-barcode-scanner-feature.component';

describe('LegacyRtuBatchBarcodeScannerFeatureComponent', () => {
  let component: LegacyRtuBatchBarcodeScannerFeatureComponent;
  let fixture: ComponentFixture<LegacyRtuBatchBarcodeScannerFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LegacyRtuBatchBarcodeScannerFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LegacyRtuBatchBarcodeScannerFeatureComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
