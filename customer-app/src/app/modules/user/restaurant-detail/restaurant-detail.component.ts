import {

  Component,

  OnInit

} from '@angular/core';

import {

  ActivatedRoute

} from '@angular/router';

import {

  MenuService

} from '../../../core/services/menu.service';

import {

  CartService

} from '../../../core/services/cart.service';

@Component({

  selector: 'app-restaurant-detail',

  templateUrl:
    './restaurant-detail.component.html',

  styleUrls: [
    './restaurant-detail.component.scss'
  ]

})

export class RestaurantDetailComponent
implements OnInit {

  menu: any[] = [];

  cartItems: any[] = [];

  restaurantId!: string;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private menuService:
      MenuService,

    public cartService:
      CartService

  ) {}

  ngOnInit(): void {

    const id =

      this.route.snapshot
        .paramMap.get('id');

    if (!id) return;

    this.restaurantId = id;

    this.loadMenu();

    // CART SYNC
    this.cartService.cart$
      .subscribe(items => {

        this.cartItems = items;

      });

  }

  // ==============================
  // LOAD MENU
  // ==============================
  loadMenu(): void {

    this.loading = true;

    this.menuService
      .getMenu(this.restaurantId)
      .subscribe({

        next: (res: any) => {

          this.menu =
            res.data;

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  // ==============================
  // ADD TO CART
  // ==============================
  addToCart(item: any): void {

    this.cartService
      .addToCart(

        item,

        this.restaurantId

      );

  }

  // ==============================
  // INCREASE QTY
  // ==============================
  increase(item: any): void {

    this.cartService
      .increaseQty(item);

      this.cartService.increaseQty(item);
  }

  // ==============================
  // DECREASE QTY
  // ==============================
  decrease(item: any): void {

    this.cartService
      .decreaseQty(item);

      this.cartService.decreaseQty(item);

  }

  // ==============================
  // TOTAL
  // ==============================
  get total(): number {

    return this.cartService
      .getTotal();

  }

}