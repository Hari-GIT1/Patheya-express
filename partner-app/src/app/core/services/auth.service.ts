import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  private loggedIn = new BehaviorSubject<boolean>(
    !!sessionStorage.getItem('token')
  );

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  // LOGIN API
  login(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/auth/login`,
      data
    );

  }

  // REGISTER API
  register(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/auth/owner-register`,
      data
    );

  }

  // SAVE TOKEN
  saveToken(token: string): void {

    sessionStorage.setItem('token', token);

    this.loggedIn.next(true);

  }

  // LOGOUT
  logout(): void {

    sessionStorage.removeItem('token');

    this.loggedIn.next(false);

  }

  // AUTH CHECK
  isAuthenticated(): boolean {

    return !!sessionStorage.getItem('token');

  }

  // GET TOKEN
  getToken(): string | null {

    return sessionStorage.getItem('token');

  }

  saveUser(user: any): void {

    sessionStorage.setItem(
      'user',
      JSON.stringify(user)
    );
  
  }
  
  getUser(): any {
  
    return JSON.parse(
      sessionStorage.getItem('user') || '{}'
    );
  
  }
  // GET SETTINGS
getOwnerSettings() {

  return this.http.get(

    `${this.apiUrl}/owner/settings`

  );

}

// UPDATE SETTINGS
updateOwnerSettings(data: any) {

  return this.http.put(

    `${this.apiUrl}/owner/settings`,

    data

  );

}

}