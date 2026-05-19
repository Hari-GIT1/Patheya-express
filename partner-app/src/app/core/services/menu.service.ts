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

export class MenuService {

  apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // GET PARTNER MENU
  // ==============================
  getMenu():
  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/menu`

    );

  }

  // ==============================
  // GET RESTAURANT MENU
  // ==============================
  getRestaurantMenu(
    restaurantId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/menu/${restaurantId}`

    );

  }

  // ==============================
  // ADD MENU ITEM
  // ==============================
  addMenu(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/menu`,

      data

    );

  }

  // ==============================
  // UPDATE MENU ITEM
  // ==============================
  updateMenu(

    id: string,

    data: any

  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/menu/${id}`,

      data

    );

  }

  // ==============================
  // DELETE MENU ITEM
  // ==============================
  deleteMenu(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/menu/${id}`

    );

  }

  // ==============================
  // UPDATE AVAILABILITY
  // ==============================
  updateAvailability(

    id: string,

    isAvailable: boolean

  ): Observable<any> {

    return this.http.patch(

      `${this.apiUrl}/menu/${id}/availability`,

      { isAvailable }

    );

  }

}