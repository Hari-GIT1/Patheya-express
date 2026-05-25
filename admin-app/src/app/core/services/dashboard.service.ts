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
export class DashboardService {

  constructor(
    private api: ApiService
  ) {}

  getDashboardStats():
  Observable<any> {

    return this.api.get(

      API_ENDPOINTS.DASHBOARD.STATS

    );

  }

}