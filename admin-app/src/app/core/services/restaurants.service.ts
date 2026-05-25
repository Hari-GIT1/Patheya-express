import { Injectable }
from '@angular/core';

import { Observable }
from 'rxjs';

import { ApiService }
from './api.service';

import {

  API_ENDPOINTS

} from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(
    private api: ApiService
  ) {}

  getPendingRestaurants(
    params?: any
  ): Observable<any> {

    return this.api.get(

      API_ENDPOINTS
        .RESTAURANTS
        .PENDING,

      params

    );

  }

  getRestaurantById(
    id: string
  ): Observable<any> {

    return this.api.get(

      `${API_ENDPOINTS
        .RESTAURANTS
        .DETAILS}/${id}`

    );

  }

  updateRestaurantStatus(

    id: string,

    status: string

  ): Observable<any> {

    return this.api.patch(

      `${API_ENDPOINTS
        .RESTAURANTS
        .UPDATE_STATUS}/${id}/status`,

      {

        status

      }

    );

  }

}