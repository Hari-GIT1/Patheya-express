import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  private STORAGE_KEY = 'cart_items';

  private cart: any[] = this.loadCart();

  private cartSubject = new BehaviorSubject<any[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  // 🔄 Load from localStorage
  private loadCart(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // 💾 Save to localStorage
  private saveCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
  }

  private updateCart() {
    this.saveCart();                // ✅ persist
    this.cartSubject.next([...this.cart]); // ✅ update UI
  }

  getCart() {
    return this.cart;
  }

  addToCart(item: any, restaurantId: string) {

    // 🚨 If cart has items from another restaurant → clear
    if (this.cart.length > 0 && this.cart[0].restaurantId !== restaurantId) {
      this.clearCart();
    }
  
    const existing = this.cart.find(i => i._id === item._id);
  
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({
        ...item,
        quantity: 1,
        restaurantId   // ✅ store restaurant
      });
    }
  
    this.updateCart();
  }

  increaseQty(item: any) {
    item.quantity++;
    this.updateCart();
  }

  decreaseQty(item: any) {
    item.quantity--;

    if (item.quantity <= 0) {
      this.cart = this.cart.filter(i => i._id !== item._id);
    }

    this.updateCart();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.updateCart();
  }
}