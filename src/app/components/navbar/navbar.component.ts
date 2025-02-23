import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router, private authService: AuthService){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout()
        .subscribe({
          next: () => {
            this.router.navigate(['/'])
          },
          error: (error) => {
            console.log(error)
          },
        }
        );
  }
}
