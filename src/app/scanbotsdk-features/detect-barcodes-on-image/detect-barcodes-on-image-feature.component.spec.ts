import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetectBarcodesOnImageFeatureComponent } from './detect-barcodes-on-image-feature.component';

describe('DetectBarcodesOnImageFeatureComponent', () => {
  let component: DetectBarcodesOnImageFeatureComponent;
  let fixture: ComponentFixture<DetectBarcodesOnImageFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DetectBarcodesOnImageFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetectBarcodesOnImageFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
