import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // LOGIN
  // ==============================

  login(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/delivery/login`,

      data

    );

  }

  // ==============================
  // SAVE TOKEN
  // ==============================

  saveToken(
    token: string
  ): void {

    localStorage.setItem(
      'delivery_token',
      token
    );

  }

  // ==============================
  // GET TOKEN
  // ==============================

  getToken(): string | null {

    return localStorage.getItem(
      'delivery_token'
    );

  }

  // ==============================
  // SAVE USER
  // ==============================

  saveUser(
    user: any
  ): void {

    localStorage.setItem(

      'delivery_user',

      JSON.stringify(user)

    );

  }

  // ==============================
  // GET USER
  // ==============================

  getUser(): any {

    const user =
      localStorage.getItem(
        'delivery_user'
      );

    return user
      ? JSON.parse(user)
      : null;

  }

  // ==============================
  // LOGOUT
  // ==============================

  logout(): void {

    localStorage.removeItem(
      'delivery_token'
    );

    localStorage.removeItem(
      'delivery_user'
    );

  }

  // ==============================
  // AUTH CHECK
  // ==============================

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}