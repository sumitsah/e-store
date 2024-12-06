import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { LoginResponse, UserLogin } from '../../model/user';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';

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
      this.router.navigate(['products']);
    })
  }


}
