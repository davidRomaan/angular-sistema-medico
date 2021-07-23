import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const gapi: any;
const base_url = environment.base_url;
let headers = new HttpHeaders().set('content-type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

  createUser(formData: RegisterForm): Observable<any>{
    return this.http.post(`${base_url}/users`, formData, {headers: headers}).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );;
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData, { headers: headers }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token}, { headers: headers }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.generatedToken);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, { headers: { 'x-token': token } }).pipe(
      tap((resp: any)=> {
          localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(err => of(false))
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    })
  }

  googleInit() {
    return new Promise<void>((resolve) => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1094190677297-pc507qlclocmnj88c3lcg9nj92dkft3e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });
      
    })
  }
}
