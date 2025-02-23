import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormComponent } from '../edit-form/edit-form.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register-form/register-form.component';
import { IUser } from '../interfaces/user';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports:[CommonModule, NavbarComponent]
})
export class ListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.$values; 
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.getUsers();
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '50%',
        data: res, 
      });
    });
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '50%',
      data: user, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  registerUser() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
