import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { environment }
from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RestaurantAdminService {

  private apiUrl =
    `${environment.apiBaseUrl}/admin/restaurants`;

  constructor(
    private http: HttpClient
  ) {}

  getPendingRestaurants() {

    return this.http.get(
      `${this.apiUrl}/pending`
    );

  }

  approveRestaurant(
    id: string
  ) {
  
    return this.http.patch(
  
      `${this.apiUrl}/${id}/status`,
  
      {
        status: 'approved'
      }
  
    );
  
  }

  rejectRestaurant(
    id: string,
    reason: string
  ) {
  
    return this.http.patch(
  
      `${this.apiUrl}/${id}/status`,
  
      {
  
        status: 'rejected',
  
        reason
  
      }
  
    );
  
  }

} 