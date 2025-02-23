import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register-form.component.html',
  imports: [CommonModule, MatDialogActions, MatDialogContent, ReactiveFormsModule,]
})
export class RegisterComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      Email: ['', []],
      Password: ['', []],
      UserData: this.fb.group({
        IdentificationNumber: [''],
        Names: ['', []],
        LastNames: ['', []]
      })
    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      const values = this.userForm.value;
      this.userService.registerUser(values).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '50%',
            data: res,
          });
        },
        error: (err) => {
          const errors = err.error;
          if (errors || errors?.errors) this.userService.setFormErrors(errors, this.userForm);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
