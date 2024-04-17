import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtractImagesFromPdfFeatureComponent } from './extract-images-from-pdf-feature.component';

describe('ExtractImagesFromPdfFeatureComponent', () => {
  let component: ExtractImagesFromPdfFeatureComponent;
  let fixture: ComponentFixture<ExtractImagesFromPdfFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExtractImagesFromPdfFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtractImagesFromPdfFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
