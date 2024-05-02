import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature.component';

describe('ScanbotSdkFeatureComponent', () => {
  let component: ScanbotSdkFeatureComponent;
  let fixture: ComponentFixture<ScanbotSdkFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ScanbotSdkFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanbotSdkFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
