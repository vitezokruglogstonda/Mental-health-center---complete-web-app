import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPictureDialogComponent } from './upload-picture-dialog.component';

describe('UploadPictureDialogComponent', () => {
  let component: UploadPictureDialogComponent;
  let fixture: ComponentFixture<UploadPictureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPictureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
