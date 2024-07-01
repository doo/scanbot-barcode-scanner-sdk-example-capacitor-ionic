import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuMultiScanningFeatureComponent } from './rtu-multi-scanning-feature.component';

describe('RtuMultiScanningFeatureComponent', () => {
  let component: RtuMultiScanningFeatureComponent;
  let fixture: ComponentFixture<RtuMultiScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuMultiScanningFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuMultiScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
