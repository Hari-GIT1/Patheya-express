import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  constructor(private api: ApiService,
              private http:HttpClient
  ) {}

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.api.get<Restaurant[]>('restaurants');
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.api.get<Restaurant>(`restaurants/${id}`);
  }

  getMenu(restaurantId: string) {
    return this.api.get(`restaurants/${restaurantId}/menu`);
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}/restaurants`);
  }
}
