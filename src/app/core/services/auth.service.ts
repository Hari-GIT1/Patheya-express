import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  // ✅ LOGIN API
  login(data: any): Observable<any> {
    return this.http.post('/api/auth/login', data);
  }

  // ✅ REGISTER API
  register(data: any): Observable<any> {
    return this.http.post('/api/auth/register', data);
  }

  // ✅ SAVE USER (AFTER LOGIN)
  setUser(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.userSubject.next(user);
  }

  // ✅ LOGOUT
  logout() {
    localStorage.clear();
    this.userSubject.next(null);
  }

  // ✅ REDIRECT BASED ON ROLE
  redirectUser(router: Router) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
  
    if (!user) {
      router.navigate(['/auth/login']);
      return;
    }
  
    if (user.role === 'owner') {
      router.navigate(['/restaurant/dashboard']);
    } else {
      router.navigate(['/']); // ✅ CUSTOMER HOME
    }
  }
}