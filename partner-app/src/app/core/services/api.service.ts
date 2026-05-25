import {
  Injectable
} from '@angular/core';

import {

  HttpClient,

  HttpParams

} from '@angular/common/http';

import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // GET
  // ==============================
  get(
    endpoint: string,
    queryParams?: any
  ) {

    let params =
      new HttpParams();

    if (queryParams) {

      Object.keys(queryParams)
        .forEach((key) => {

          const value =
            queryParams[key];

          if (

            value !== undefined &&

            value !== null &&

            value !== ''

          ) {

            params =
              params.set(
                key,
                value
              );

          }

        });

    }

    return this.http.get(

      `${this.apiUrl}${endpoint}`,

      { params }

    );

  }

  // ==============================
  // POST
  // ==============================
  post(
    endpoint: string,
    body: any
  ) {

    return this.http.post(

      `${this.apiUrl}${endpoint}`,

      body

    );

  }

  // ==============================
  // PUT
  // ==============================
  put(
    endpoint: string,
    body: any
  ) {

    return this.http.put(

      `${this.apiUrl}${endpoint}`,

      body

    );

  }

  // ==============================
  // PATCH
  // ==============================
  patch(
    endpoint: string,
    body: any
  ) {

    return this.http.patch(

      `${this.apiUrl}${endpoint}`,

      body

    );

  }

  // ==============================
  // DELETE
  // ==============================
  delete(endpoint: string) {

    return this.http.delete(

      `${this.apiUrl}${endpoint}`

    );

  }

}