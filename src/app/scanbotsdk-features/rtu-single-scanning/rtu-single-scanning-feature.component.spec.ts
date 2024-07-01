import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuSingleScanningFeatureComponent } from './rtu-single-scanning-feature.component';

describe('RtuSingleScanningFeatureComponent', () => {
  let component: RtuSingleScanningFeatureComponent;
  let fixture: ComponentFixture<RtuSingleScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuSingleScanningFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuSingleScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
