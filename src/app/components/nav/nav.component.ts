import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'store-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isAuthenticated!: boolean;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  onLogOut() {
    this.authService.doLogout();
    this.router.navigate(["home"]);
  }
}
