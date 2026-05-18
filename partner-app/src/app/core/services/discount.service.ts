import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http:HttpClient) { }
  createDiscount(data: any) {

    return this.http.post(
  
      `${environment.apiUrl}/discounts`,
  
      data
  
    );
  
  }
  
  getDiscounts() {
  
    return this.http.get(
  
      `${environment.apiUrl}/discounts`
  
    );
  
  }
}
