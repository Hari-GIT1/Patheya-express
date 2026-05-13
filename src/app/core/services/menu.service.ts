import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MenuService {

  constructor(private http: HttpClient) {}

  // 📥 GET MENU
  getMenu(restaurantId: string) {
    return this.http.get<any[]>(`https://patheya-express.onrender.com/api/menu/${restaurantId}`);
  }

  // ➕ ADD ITEM
  addItem(data: FormData) {
    return this.http.post('https://patheya-express.onrender.com/api/menu', data);
  }

  // ✏️ UPDATE ITEM
  updateItem(id: string, data: FormData) {
    return this.http.put(`https://patheya-express.onrender.com/api/menu/${id}`, data);
  }

  // ❌ DELETE ITEM
  deleteMenuItem(id: string) {
    return this.http.delete(`https://patheya-express.onrender.com/api/menu/${id}`);
  }
}