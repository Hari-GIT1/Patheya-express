import {

  Injectable

} from '@angular/core';

import {

  BehaviorSubject

} from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class CartService {

  // ==============================
  // STORAGE KEY
  // ==============================
  private readonly STORAGE_KEY =
    'cart_items';

  // ==============================
  // CART STATE
  // ==============================
  private cartItems: any[] =
    this.loadCart();

  private cartSubject =
    new BehaviorSubject<any[]>(

      this.cartItems

    );

  // PUBLIC OBSERVABLE
  cart$ =
    this.cartSubject.asObservable();

  constructor() {}

  // ==============================
  // LOAD CART
  // ==============================
  private loadCart(): any[] {

    const data =
      localStorage.getItem(

        this.STORAGE_KEY

      );

    return data
      ? JSON.parse(data)
      : [];

  }

  // ==============================
  // SAVE CART
  // ==============================
  private persistCart(): void {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(
        this.cartItems
      )

    );

  }

  // ==============================
  // UPDATE STATE
  // ==============================
  private updateState(): void {

    this.persistCart();

    this.cartSubject.next([

      ...this.cartItems

    ]);

  }

  // ==============================
  // GET CART
  // ==============================
  getCart(): any[] {

    return [...this.cartItems];

  }

  // ==============================
  // GET ITEM COUNT
  // ==============================
  getItemCount(): number {

    return this.cartItems.reduce(

      (sum, item) =>

        sum + item.quantity,

      0

    );

  }

  // ==============================
  // GET TOTAL
  // ==============================
  getTotal(): number {

    return this.cartItems.reduce(

      (sum, item) =>

        sum +

        (item.price * item.quantity),

      0

    );

  }

  // ==============================
  // ADD TO CART
  // ==============================
  addToCart(

    item: any,

    restaurantId: string

  ): void {

    // DIFFERENT RESTAURANT
    if (

      this.cartItems.length > 0 &&

      this.cartItems[0]
        .restaurantId !==
          restaurantId

    ) {

      this.clearCart();

    }

    // FIND EXISTING
    const existingItem =
      this.cartItems.find(

        i => i._id === item._id

      );

    // INCREASE QTY
    if (existingItem) {

      existingItem.quantity += 1;

    }

    // NEW ITEM
    else {

      this.cartItems.push({

        ...item,

        quantity: 1,

        restaurantId

      });

    }

    this.updateState();

  }

  // ==============================
  // INCREASE QUANTITY
  // ==============================
  increaseQty(item: any): void {

    const cartItem =
      this.cartItems.find(

        i => i._id === item._id

      );

    if (!cartItem) return;

    cartItem.quantity += 1;

    this.updateState();

  }

  // ==============================
  // DECREASE QUANTITY
  // ==============================
  decreaseQty(item: any): void {

    const cartItem =
      this.cartItems.find(

        i => i._id === item._id

      );

    if (!cartItem) return;

    cartItem.quantity -= 1;

    // REMOVE ITEM
    if (

      cartItem.quantity <= 0

    ) {

      this.removeItem(item._id);

      return;

    }

    this.updateState();

  }

  // ==============================
  // REMOVE ITEM
  // ==============================
  removeItem(itemId: string): void {

    this.cartItems =

      this.cartItems.filter(

        item =>
          item._id !== itemId

      );

    this.updateState();

  }

  // ==============================
  // CLEAR CART
  // ==============================
  clearCart(): void {

    this.cartItems = [];

    this.updateState();

  }

  // ==============================
  // CHECK EMPTY
  // ==============================
  isCartEmpty(): boolean {

    return this.cartItems.length === 0;

  }

}