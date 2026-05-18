import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { CartService } from '../../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  menu: any[] = [];
  cartItems: any[] = [];
  restaurantId!: string;
  

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (!id) return;
  
    this.restaurantId = id;
  
    this.menuService.getMenu(id).subscribe(res => {
      this.menu = res;
    });
  
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item, this.restaurantId);
  }

  increase(item: any) {
    this.cartService.increaseQty(item);
    item.quantity++;
  }
  
  decrease(item: any) {
    this.cartService.decreaseQty(item);
    item.quantity--;
  }

  get total() {
    return this.cartService.getTotal();
  }
}