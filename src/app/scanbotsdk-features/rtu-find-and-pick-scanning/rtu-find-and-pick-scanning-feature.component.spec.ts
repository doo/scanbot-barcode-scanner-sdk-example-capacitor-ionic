import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtuFindAndPickScanningFeatureComponent } from './rtu-find-and-pick-scanning-feature.component';

describe('RtuFindAndPickScanningFeatureComponent', () => {
  let component: RtuFindAndPickScanningFeatureComponent;
  let fixture: ComponentFixture<RtuFindAndPickScanningFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RtuFindAndPickScanningFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RtuFindAndPickScanningFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
