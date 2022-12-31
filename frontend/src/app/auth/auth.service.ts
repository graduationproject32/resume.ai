import { HttpClient } from '@angular/common/http';
//import http header
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, lastValueFrom, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // we will use behavior subject because we want to emit the current user
  // user = new Subject<User>();
  user = new BehaviorSubject<User | null>(null);
  tokenExpiredTimer: any;
  signup(
    email: string,
    password: string,
    user_level: string,
    user_name: string,
    user_position: string
  ) {
    const headers = new HttpHeaders({});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    const res = this.httpClient
      .post<{ code: number; msg: string }>(
        'http://127.0.0.1:5000/resumeanalysis/signup',
        {
          user_email: email,
          user_password: password,
          user_level: user_level,
          user_name: user_name,
          user_lastposition: user_position,
        },
        { headers: headers, observe: 'response' }
      )
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
        }),
        tap((resData) => {
          if (resData.body?.code == 200) {
            this.router.navigate(['/login']);
          }
        })
      );
    return lastValueFrom(res);
  }
  login(email: string, password: string) {
    const res = this.httpClient
      .post<{ code: number; expiryDate: number; data: any }>(
        'http://127.0.0.1:5000/resumeanalysis/login',
        {
          user_email: email,
          user_password: password,
        }
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        tap((resData) => {
          console.log(resData.code);
          const expiryDate = new Date(
            new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000
          );
          if (resData.code === 200) {
            console.log(resData.data);
            this.authHandler(email, 'token', expiryDate);
            this.router.navigate(['upload']);
          }
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
      // this.autoLogout(expiryDate);
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
    // this.autoLogout(expiryDate);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(localStorage.getItem('userData'));
  }
}
