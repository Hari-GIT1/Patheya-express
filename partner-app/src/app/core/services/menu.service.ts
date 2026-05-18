import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // GET MENU
  getMenu() {

    return this.http.get(
      `${this.apiUrl}/menu`
    );

  }

  // ADD MENU
  addMenu(data: any) {

    return this.http.post(
      `${this.apiUrl}/menu`,
      data
    );

  }

  // DELETE
  deleteItem(id: string) {

    return this.http.delete(
      `${this.apiUrl}/menu/${id}`
    );

  }

  // TOGGLE
  updateAvailability(
    id: string,
    isAvailable: boolean
  ) {
  
    return this.http.patch(
  
      `${environment.apiUrl}/menu/${id}/availability`,
  
      { isAvailable }
  
    );
  
  }
  updateMenu(id: string, data: any) {

    return this.http.put(
  
      `${environment.apiUrl}/menu/${id}`,
  
      data
  
    );
  
  }
  
  deleteMenu(id: string) {
  
    return this.http.delete(
  
      `${environment.apiUrl}/menu/${id}`
  
    );
  
  }

}