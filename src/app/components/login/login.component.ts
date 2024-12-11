import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { LoginResponse, UserDetails } from '../../model/user';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Decode } from '../../model/token';

@Component({
  selector: 'store-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })


  onSubmit() {
    this.authService.doLogin({ username: this.loginForm.value.username, password: this.loginForm.value.password }).subscribe((res: LoginResponse) => {
      this.localStorageService.setItem('token', res.token)
      const decoded: Decode = jwtDecode(res.token);
      let userDetails: UserDetails = {
        id: decoded.sub,
        username: decoded.user
      }
      this.localStorageService.setItem('userDetails', userDetails)
      this.router.navigate(['products']);
    })
  }


}
