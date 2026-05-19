import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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
    );

  }

  getMe() {

    return this.http.get(
      `${this.apiUrl}/me`
    );

  }

  logout() {

    localStorage.removeItem(
      'adminToken'
    );

  }

}