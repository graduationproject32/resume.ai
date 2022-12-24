import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, lastValueFrom, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  // we will use behavior subject because we want to emit the current user
  // user = new Subject<User>();
  user = new BehaviorSubject<User | null>(null);
  tokenExpiredTimer: any;
  signup(email: string, password: string) {
    const res = this.httpClient
      .post<{ msg: string }>('http://localhost:3000/signup', {
        email: email,
        password: password,
      })
      .pipe(
        // we can use catchError here modify the error message and throw it
        catchError((err) => {
          let errorMessage = 'An unknown error occured';
          if (err.error.msg === '') {
            err.error.msg = errorMessage;
          } else if (err.error.msg === 'user already exists') {
            err.error.msg = 'Email already exists';
          }
          throw err;
        })
      );
    return lastValueFrom(res);
  }
  login(email: string, password: string) {
    const res = this.httpClient
      .post<{ token: string; expiryDate: number }>(
        'http://localhost:3000/login',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        tap((resData) => {
          const expiryDate = new Date(+resData.expiryDate);
          this.authHandler(email, resData.token, expiryDate);
        })
      );
    return lastValueFrom(res);
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpiredTimer) {
      clearTimeout(this.tokenExpiredTimer);
    }
    this.router.navigate(['/auth']);
  }
  autoLogin() {
    const userData: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') ?? '{}');
    console.log(userData);
    if (!userData) {
      return;
    }
    const expiryDate = new Date(userData._tokenExpirationDate);
    const loadedUser = new User(userData.email, userData._token, expiryDate);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(expiryDate);
    }
  }
  autoLogout(expiryDate: Date) {
    const time = expiryDate.getTime() - new Date().getTime();
    this.tokenExpiredTimer = setTimeout(() => {
      this.logout();
    }, +time);
  }
  authHandler(email: string, token: string, expiryDate: Date) {
    const user = new User(email, token, expiryDate);
    this.user.next(user);
    this.autoLogout(expiryDate);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
