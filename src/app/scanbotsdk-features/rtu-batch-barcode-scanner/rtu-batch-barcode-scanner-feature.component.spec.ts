import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuBatchBarcodeScannerFeatureComponent } from './rtu-batch-barcode-scanner-feature.component';

describe('RtuBatchBarcodeScannerFeatureComponent', () => {
  let component: RtuBatchBarcodeScannerFeatureComponent;
  let fixture: ComponentFixture<RtuBatchBarcodeScannerFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuBatchBarcodeScannerFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuBatchBarcodeScannerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
