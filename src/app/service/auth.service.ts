import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginResponse, UserLogin } from '../model/user';
import { BehaviorSubject, catchError, Observable, Subject, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'https://fakestoreapi.com/auth/login'

  private httpClient = inject(HttpClient);
  private localStorage = inject(LocalStorageService)
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  constructor() { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  hasToken(): boolean {
    return this.localStorage.getItem('token') ? true : false;
  }

  // A subject in Rx is both Observable and Observer. In this case, we only care about the Observable part, letting other parts of our app the ability to subscribe to our Observable.
  // We can return only the Observable part of our subject with the help of the asObservable function.
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  doLogin(body: UserLogin): Observable<LoginResponse> {
    // username:'johnd',password:'m38rmF$',  
    return this.httpClient.post<LoginResponse>(this.url, body, this.httpOptions).
      pipe(
        tap(_ => this.isAuthenticated$.next(true)),
        catchError((err, caught) => {
          throw `error => ${err}`
        })
      );
  }

  doLogout() {
    this.localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
  }

}
