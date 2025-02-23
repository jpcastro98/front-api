import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './edit-form.component.html',
  imports:[CommonModule,MatDialogActions,MatDialogContent,ReactiveFormsModule]
})
export class FormComponent {
  userFormEdit: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogEditRef: MatDialogRef<FormComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userFormEdit = this.fb.group({
      Email: [data.Email],
      Password: ['',],
      UserData: this.fb.group({
        Names: [data.UserData.Names,],
        IdentificationNumber: [data.UserData.IdentificationNumber],
        LastNames: [data.UserData.LastNames,],
        score: [data.UserData.score]
      })
     
    });
  }


  onSubmit() {
    if (this.userFormEdit.valid) {     
      this.userService.updateUser(this.data.Id, this.userFormEdit.value).subscribe({
        next: (result) => {
          this.dialogEditRef.close(true); 
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '50%',
            data: result, 
          });
        },
        error: (err) => {
          const errors = err.error;
          if (errors || errors?.errors) this.userService.setFormErrors(errors, this.userFormEdit);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogEditRef.close();
  }
}
