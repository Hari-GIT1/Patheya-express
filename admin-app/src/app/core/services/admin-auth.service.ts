import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { environment }
from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private apiUrl =
    `${environment.apiBaseUrl}/admin/auth`;

  constructor(
    private http: HttpClient
  ) {}

  login(data: any) {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    ).pipe(

      tap((response: any) => {

        localStorage.setItem(
          'adminToken',
          response.data.token
        );

        localStorage.setItem(
          'adminData',
          JSON.stringify(
            response.data.admin
          )
        );

      })

    );

  }

  getMe() {

    return this.http.get(
      `${this.apiUrl}/me`
    );

  }

  getToken(): string | null {

    return localStorage.getItem(
      'adminToken'
    );

  }

  getAdmin() {

    return JSON.parse(
      localStorage.getItem(
        'adminData'
      ) || '{}'
    );

  }

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

  logout() {

    localStorage.removeItem(
      'adminToken'
    );

    localStorage.removeItem(
      'adminData'
    );

  }

}