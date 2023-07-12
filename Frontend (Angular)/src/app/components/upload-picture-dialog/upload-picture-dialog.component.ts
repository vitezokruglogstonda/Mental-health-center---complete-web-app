import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-picture-dialog',
  templateUrl: './upload-picture-dialog.component.html',
  styleUrls: ['./upload-picture-dialog.component.scss']
})
export class UploadPictureDialogComponent implements OnInit {

  public uploadedPicture: File | null | undefined;
  public dragDropArea: Element | null;

  constructor(
    private elRef: ElementRef,
    public dialogRef: MatDialogRef<UploadPictureDialogComponent>
  ) {
    this.uploadedPicture = null;
    this.dragDropArea = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dragDropArea = (<HTMLElement>this.elRef.nativeElement).querySelector(".drag-drop");
    environment.dragAndDropSettings.eventList_preventDefaults.forEach((eventName) => {
      this.dragDropArea?.addEventListener(eventName, this.preventDefaults, false)
    });
    environment.dragAndDropSettings.eventList_highlight.forEach(eventName => {
      this.dragDropArea?.addEventListener(eventName, () => {
        this.highlight(event);
      }, false)
    });
    environment.dragAndDropSettings.eventList_unhighlight.forEach(eventName => {
      this.dragDropArea?.addEventListener(eventName, () => {
        this.unhighlight(event);
      }, false);
    });
    this.dragDropArea?.addEventListener("drop", () => {
      this.handleDrop(event as DragEvent, this.dialogRef, this.uploadedPicture, this.elRef);
    }, false);

  }

  preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight(e: Event | undefined) {
    if(e){
      (<HTMLElement> e.target).classList.add(environment.dragAndDropSettings.onDropClassName);
    }
  }

  unhighlight(e: Event | undefined) {
    if(e){
      (<HTMLElement>e.target).classList.remove(environment.dragAndDropSettings.onDropClassName);
    }
  }

  handleDrop(e: DragEvent  | undefined, dialogRef: MatDialogRef<UploadPictureDialogComponent>, uploadedPicture: File | null | undefined, elRef: ElementRef) {
    let errorMessageElement: Element | null = (<HTMLElement>elRef.nativeElement).querySelector(".upload-error");
    if(e != undefined){
      if ((e.dataTransfer as DataTransfer).files) {
        let files = (e.dataTransfer as DataTransfer).files;
        if (files.length > 1) {
          if(errorMessageElement){
            errorMessageElement.innerHTML = environment.dialog_UploadPhoto_Settings.errorMessage_numberOfFiles;
          }
        } else {
          uploadedPicture = files.item(0);
          if(uploadedPicture?.type.startsWith("image")){
            dialogRef.close(uploadedPicture);
          }else{
            if(errorMessageElement){
              errorMessageElement.innerHTML = environment.dialog_UploadPhoto_Settings.errorMessage_fileType;
            }
          }
        }
      }
    }
  }

  newPicture(ev: Event | null) {
    if(ev){
      if((ev.target as HTMLInputElement)?.files?.length===1){
        this.uploadedPicture = (ev.target as HTMLInputElement)?.files?.item(0);
        this.dialogRef.close(this.uploadedPicture);
      }
    }
  }

}
