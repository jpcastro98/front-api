import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',

  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  imports:[CommonModule,MatDialogActions,MatDialogContent]
  
})
export class ConfirmDialogComponent {

  protected result;

  constructor(
    public dialoRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.result = data;
  }

  closeDialog(): void {
    this.dialoRef.close();
  }
}
