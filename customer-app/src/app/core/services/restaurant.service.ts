import {

  Injectable

} from '@angular/core';

import {

  Observable

} from 'rxjs';

import {

  ApiService

} from './api.service';

import {

  Restaurant

} from '../../models/restaurant.model';

@Injectable({

  providedIn: 'root'

})

export class RestaurantService {

  constructor(

    private api: ApiService

  ) {}

  // ==============================
  // GET ALL RESTAURANTS
  // ==============================
  getAll(): Observable<any> {

    return this.api.get(
      'restaurants'
    );

  }

  // ==============================
  // GET SINGLE RESTAURANT
  // ==============================
  getRestaurantById(
    id: string
  ): Observable<any> {

    return this.api.get(
      `restaurants/${id}`
    );

  }

  // ==============================
  // GET MENU
  // ==============================
  getMenu(
    restaurantId: string
  ): Observable<any> {

    return this.api.get(
      `restaurants/${restaurantId}/menu`
    );

  }

}