import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StorageCleanupFeatureComponent } from './storage-cleanup-feature.component';

describe('StorageCleanupFeatureComponent', () => {
  let component: StorageCleanupFeatureComponent;
  let fixture: ComponentFixture<StorageCleanupFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StorageCleanupFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageCleanupFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
