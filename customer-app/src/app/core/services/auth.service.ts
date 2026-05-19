import {

  Injectable

} from '@angular/core';

import {

  HttpClient

} from '@angular/common/http';

import {

  BehaviorSubject,

  Observable

} from 'rxjs';

import {

  Router

} from '@angular/router';

import {

  environment

} from 'src/environments/environment';

@Injectable({

  providedIn: 'root'

})

export class AuthService {

  private baseUrl =
    environment.api.baseUrl;

  // ==============================
  // USER STATE
  // ==============================
  private userSubject =
    new BehaviorSubject<any>(

      this.getStoredUser()

    );

  user$ =
    this.userSubject
      .asObservable();

  constructor(

    private http:
      HttpClient

  ) {}

  // ==============================
  // LOGIN
  // ==============================
  login(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.baseUrl}/auth/login`,

      data

    );

  }

  // ==============================
  // REGISTER
  // ==============================
  register(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.baseUrl}/auth/register`,

      data

    );

  }

  // ==============================
  // SAVE AUTH DATA
  // ==============================
  setUser(

    user: any,

    token: string

  ): void {

    localStorage.setItem(

      'user',

      JSON.stringify(user)

    );

    localStorage.setItem(
      'token',
      token
    );

    this.userSubject
      .next(user);

  }

  // ==============================
  // GET USER
  // ==============================
  getUser(): any {

    return this.userSubject
      .value;

  }

  // ==============================
  // GET TOKEN
  // ==============================
  getToken():
  string | null {

    return localStorage
      .getItem('token');

  }

  // ==============================
  // AUTH CHECK
  // ==============================
  isAuthenticated():
  boolean {

    return !!this.getToken();

  }

  // ==============================
  // LOGOUT
  // ==============================
  logout(): void {

    localStorage.removeItem(
      'user'
    );

    localStorage.removeItem(
      'token'
    );

    this.userSubject
      .next(null);

  }

  // ==============================
  // SAFE USER PARSE
  // ==============================
  private getStoredUser() {

    const user =
      localStorage.getItem(
        'user'
      );

    if (

      !user ||

      user === 'undefined' ||

      user === 'null'

    ) {

      return null;

    }

    try {

      return JSON.parse(user);

    } catch {

      return null;

    }

  }

  // ==============================
  // ROLE REDIRECT
  // ==============================
  redirectUser(
    router: Router
  ): void {

    const user =
      this.getUser();

    if (!user) {

      router.navigate([
        '/auth/login'
      ]);

      return;

    }

    // OWNER
    if (
      user.role === 'owner'
    ) {

      router.navigate([
        '/restaurant/dashboard'
      ]);

      return;

    }

    // CUSTOMER
    router.navigate(['/']);

  }

}