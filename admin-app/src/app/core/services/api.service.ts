import { Injectable }
from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { Observable }
from 'rxjs';

import { environment }
from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl =
    environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) {}

  get<T>(

    endpoint: string,
  
    params?: any
  
  ): Observable<T> {
  
    return this.http.get<T>(
  
      `${this.apiUrl}${endpoint}`,
  
      {
  
        params
  
      }
  
    );
  
  }

  post<T>(

    endpoint: string,

    payload: any

  ): Observable<T> {

    return this.http.post<T>(

      `${this.apiUrl}${endpoint}`,

      payload

    );

  }

  put<T>(

    endpoint: string,

    payload: any

  ): Observable<T> {

    return this.http.put<T>(

      `${this.apiUrl}${endpoint}`,

      payload

    );

  }
  patch<T>(

    endpoint: string,
  
    payload: any
  
  ): Observable<T> {
  
    return this.http.patch<T>(
  
      `${this.apiUrl}${endpoint}`,
  
      payload
  
    );
  
  }

  delete<T>(
    endpoint: string
  ): Observable<T> {

    return this.http.delete<T>(

      `${this.apiUrl}${endpoint}`

    );

  }

}