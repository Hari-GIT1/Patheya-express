import {

  Injectable

} from '@angular/core';

import {

  HttpClient,

  HttpParams

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

export class ApiService {

  private baseUrl =
    environment.api.baseUrl;

  constructor(

    private http:
      HttpClient

  ) {}

  // ==============================
  // GET
  // ==============================
  get<T>(

    endpoint: string,

    params?: HttpParams

  ): Observable<T> {

    return this.http.get<T>(

      `${this.baseUrl}/${endpoint}`,

      { params }

    );

  }

  // ==============================
  // POST
  // ==============================
  post<T>(

    endpoint: string,

    data: any

  ): Observable<T> {

    return this.http.post<T>(

      `${this.baseUrl}/${endpoint}`,

      data

    );

  }

  // ==============================
  // PUT
  // ==============================
  put<T>(

    endpoint: string,

    data: any

  ): Observable<T> {

    return this.http.put<T>(

      `${this.baseUrl}/${endpoint}`,

      data

    );

  }

  // ==============================
  // PATCH
  // ==============================
  patch<T>(

    endpoint: string,

    data: any

  ): Observable<T> {

    return this.http.patch<T>(

      `${this.baseUrl}/${endpoint}`,

      data

    );

  }

  // ==============================
  // DELETE
  // ==============================
  delete<T>(

    endpoint: string

  ): Observable<T> {

    return this.http.delete<T>(

      `${this.baseUrl}/${endpoint}`

    );

  }

}