import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuMultiArScanningFeatureComponent } from './rtu-multi-ar-scanning-feature.component';

describe('RtuMultiArScanningFeatureComponent', () => {
  let component: RtuMultiArScanningFeatureComponent;
  let fixture: ComponentFixture<RtuMultiArScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuMultiArScanningFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuMultiArScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
