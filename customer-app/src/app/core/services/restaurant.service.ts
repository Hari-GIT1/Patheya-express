import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private baseUrl = `${environment.api.baseUrl}/restaurants`;
  constructor(
    private api: ApiService,
    private http: HttpClient
  ) {}

  // 🍽️ GET ALL RESTAURANTS
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.api.get<Restaurant[]>('restaurants');
  }

  // 🏪 GET RESTAURANT BY ID
  getRestaurantById(id: string): Observable<Restaurant> {
    return this.api.get<Restaurant>(`restaurants/${id}`);
  }

  // 📋 GET RESTAURANT MENU
  getMenu(restaurantId: string) {
    return this.api.get(`restaurants/${restaurantId}/menu`);
  }
  // 🌍 GET ALL RESTAURANTS (DIRECT HTTP)
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
