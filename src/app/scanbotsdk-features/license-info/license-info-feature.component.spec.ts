import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicenseInfoFeatureComponent } from './license-info-feature.component';

describe('LicenseInfoFeatureComponent', () => {
  let component: LicenseInfoFeatureComponent;
  let fixture: ComponentFixture<LicenseInfoFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LicenseInfoFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LicenseInfoFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
