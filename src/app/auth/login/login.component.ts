import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../users/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../users/register-form/register-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule,]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
    private authService: AuthService, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: () => {
            console.log(("Usuario auntenticado"));
            this.router.navigate(['/users'])
          },
          error: (error) => {
            console.log(error);

            this.errorMessage = 'Credenciales incorrectas';
          },
        }
        );
    }
  }

  registerUser() {
      const dialogRef = this.dialog.open(RegisterComponent, {
        width: '50%',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/users']);
        }
      });
    }
}
