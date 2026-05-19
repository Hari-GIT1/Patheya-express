import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { environment }
from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private apiUrl =
    `${environment.apiBaseUrl}/admin/dashboard`;

  constructor(
    private http: HttpClient
  ) {}

  getDashboardStats() {

    return this.http.get(
      this.apiUrl
    );

  }
  getLiveOrders() {

    return this.http.get(
      `${environment.apiBaseUrl}/admin/orders/live`
    );
  
  }

}