import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('Ruta actual desde RouterStateSnapshot:', state.url);

    return this.http.get<{ message: string }>(`${this.apiUrl}/auth/validate-token`, { withCredentials: true }).pipe(
      map((response) => {
        console.log('Token válido:', response.message);
        return true;
      }),
      catchError((error) => {
        console.error('Token inválido o expirado:', error);
        
        this.router.navigate(['/auth/login']);
        
        return of(false);
      })
    );
  }
}
