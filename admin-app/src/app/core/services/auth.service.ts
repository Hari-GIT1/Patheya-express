import { Injectable }
from '@angular/core';

import {

  BehaviorSubject,
  Observable,
  tap

} from 'rxjs';

import { Router }
from '@angular/router';

import { ApiService }
from './api.service';

import { TokenService }
from './token.service';

import {

  API_ENDPOINTS

} from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject =
    new BehaviorSubject<any>(null);

  currentUser$ =
    this.currentUserSubject.asObservable();

  constructor(

    private api: ApiService,

    private tokenService:
      TokenService,

    private router: Router

  ) {}

  login(
    payload: any
  ): Observable<any> {
  
    return this.api
      .post<any>(
  
        API_ENDPOINTS.AUTH.LOGIN,
  
        payload
  
      )
      .pipe(
  
        tap((response) => {
  
          this.tokenService
            .setToken(
  
              response.data.token
  
            );
  
          this.currentUserSubject
            .next(
  
              response.data.admin
  
            );
  
        })
  
      );
  
  }

  logout(): void {

    this.tokenService.clearToken();

    this.currentUserSubject.next(
      null
    );

    this.router.navigate([
      '/login'
    ]);

  }

  isLoggedIn(): boolean {

    return !!this.tokenService
      .getToken();

  }

}