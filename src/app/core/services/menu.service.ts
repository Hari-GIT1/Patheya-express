import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = `${environment.api.baseUrl}/menu`;

  constructor(private http: HttpClient) {}

  // 📥 GET MENU
  getMenu(restaurantId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${restaurantId}`);
  }

  // ➕ ADD ITEM
  addItem(data: FormData) {
    return this.http.post(this.baseUrl, data);
  }

  // ✏️ UPDATE ITEM
  updateItem(id: string, data: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // ❌ DELETE ITEM
  deleteMenuItem(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}