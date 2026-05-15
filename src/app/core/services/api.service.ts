import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    const token = localStorage.getItem('token');

    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  post<T>(url: string, data: any) {
    const token = localStorage.getItem('token');

    return this.http.post<T>(`${this.baseUrl}/${url}`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
  put<T>(url: string, data: any) {
    const token = localStorage.getItem('token');
  
    return this.http.put<T>(`${this.baseUrl}/${url}`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
  
  delete<T>(url: string) {
    const token = localStorage.getItem('token');
  
    return this.http.delete<T>(`${this.baseUrl}/${url}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}