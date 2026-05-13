import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MenuService {

  constructor(private http: HttpClient) {}

  // 📥 GET MENU
  getMenu(restaurantId: string) {
    return this.http.get<any[]>(`http://192.168.10.232:3000/api/menu/${restaurantId}`);
  }

  // ➕ ADD ITEM
  addItem(data: FormData) {
    return this.http.post('http://192.168.10.232:3000/api/menu', data);
  }

  // ✏️ UPDATE ITEM
  updateItem(id: string, data: FormData) {
    return this.http.put(`http://192.168.10.232:3000/api/menu/${id}`, data);
  }

  // ❌ DELETE ITEM
  deleteMenuItem(id: string) {
    return this.http.delete(`http://192.168.10.232:3000/api/menu/${id}`);
  }
}