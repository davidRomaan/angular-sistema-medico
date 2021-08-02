import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const gapi: any;
const base_url = environment.base_url;
let headers = new HttpHeaders().set('content-type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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

    return this.http.get(`${base_url}/login/renew`, { headers: { 'x-token': this.token } }).pipe(
      map((resp: any)=> {
        localStorage.setItem('token', resp.token);
        
        const { role,google,email,name, img = '', uid } = resp.user;
        this.user = new User(name, email, '', img, google, role, uid);
        return true;
      }),
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

  updateProfileUser(data: { name: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers)
  }

  loadUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get(url, this.headers).pipe(
      map((res: any) => {
          const users = res.users.map(user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid, user.deleted)
        )
        return {users: users, total: res.total};
      })
    )
  }

  deleteUser(user: User) {
    return this.http.delete(`${base_url}/users/${user.uid}`, { headers: { 'x-token': this.token } })
  }

  updateRole( user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers)
  }
}
