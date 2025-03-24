import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuSingleScanningWithImageResultsFeatureComponent } from './rtu-single-scanning-with-image-results.component';

describe('RtuSingleScanningWithImageResultsFeatureComponent', () => {
  let component: RtuSingleScanningWithImageResultsFeatureComponent;
  let fixture: ComponentFixture<RtuSingleScanningWithImageResultsFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuSingleScanningWithImageResultsFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuSingleScanningWithImageResultsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
