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
export class OrdersService {

  constructor(
    private api: ApiService
  ) {}

  getOrders(
    params?: any
  ): Observable<any> {

    return this.api.get(

      API_ENDPOINTS.ORDERS.LIST,

      params

    );

  }

  getLiveOrders():
  Observable<any> {

    return this.api.get(

      API_ENDPOINTS.ORDERS.LIVE

    );

  }

}