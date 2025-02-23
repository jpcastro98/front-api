import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: { Email: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`, { withCredentials: true });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${id}`, user, { withCredentials: true });
  }
  registerUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/user`, user, { withCredentials: true });
  }

  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.apiUrl}/user/${id}`, { withCredentials: true });
  }

  setFormErrors(error: any, userForm: any): void {
    if (!error.errors) {
      userForm.setErrors({ err: error});
      return;
    };
    Object.keys(error.errors).forEach((field) => {
      const control = userForm.get(field);
      if (control) {
        control.setErrors({ err: error.errors[field][0] });
      }
    });
    console.log(userForm);
  }
} 
