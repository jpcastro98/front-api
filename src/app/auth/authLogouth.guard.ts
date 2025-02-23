import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLogothGuard implements CanActivate {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.http.get<{ message: string }>(`${this.apiUrl}/auth/validate-token`, { withCredentials: true }).pipe(
      map((response) => {
        this.router.navigate(['/users']);
        return true;
      }),
      catchError((error) => {        
        return of(true);
      })
    );
  }
}
