import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private apiUrl = `${environment.apiUrl}/user-data`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`,{ withCredentials: true });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user,{ withCredentials: true });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/update`, user,{ withCredentials: true });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/delete`,{ withCredentials: true });
  }
}
