import {
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs';

import {
  ApiService
} from './api.service';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(
    private api: ApiService
  ) {}

  // ==============================
  // GET PARTNER MENU
  // ==============================
  getMenu(
    queryParams?: any
  ): Observable<any> {

    return this.api.get(

      '/menu',

      queryParams

    );

  }

  // ==============================
  // GET RESTAURANT MENU
  // ==============================
  getRestaurantMenu(

    restaurantId: string,

    queryParams?: any

  ): Observable<any> {

    return this.api.get(

      `menu/${restaurantId}`,

      queryParams

    );

  }

  // ==============================
  // ADD MENU ITEM
  // ==============================
  addMenu(
    data: any
  ): Observable<any> {

    return this.api.post(

      '/menu',

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

    return this.api.put(

      `/menu/${id}`,

      data

    );

  }

  // ==============================
  // DELETE MENU ITEM
  // ==============================
  deleteMenu(
    id: string
  ): Observable<any> {

    return this.api.delete(

      `/menu/${id}`

    );

  }

  // ==============================
  // UPDATE AVAILABILITY
  // ==============================
  updateAvailability(

    id: string,

    isAvailable: boolean

  ): Observable<any> {

    return this.api.patch(

      `/menu/${id}/availability`,

      { isAvailable }

    );

  }

}