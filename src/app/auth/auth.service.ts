import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: any): Observable<any> {
    const email = credentials.email;
    const password = credentials.password
    return this.http.post(`${this.apiUrl}/auth/login`, { "Email": email, "Password": password }, {withCredentials: true});
  }

  logout():  Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`,{} ,{withCredentials: true});
  }

}
