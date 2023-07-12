import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  public password: String;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {
    this.password = "";
  }

  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close(this.password);
  }

}
