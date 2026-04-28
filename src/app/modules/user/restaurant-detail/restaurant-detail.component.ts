import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { CartService } from '../../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls:['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  menu: any[] = [];
  cartItems: any[] = [];
  restaurantId!: string;
  topItems: any[] = [];
  suggestions: any[] = [];
  loading = true;
  menuLoaded = false;
topLoaded = false;


  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
  
    this.restaurantId = id;
  
    this.menuService.getMenu(id).subscribe((res) => {
      this.menu = res;
      this.suggestions = res.slice(0, 3);
  
      this.menuLoaded = true;
      this.checkLoading();
    });
  
    this.menuService.getTopItems(id).subscribe({
      next: (res) => {
        console.log("Top Items:", res);
  
        this.topItems = res;
  
        this.topLoaded = true;
        this.checkLoading();
      },
      error: () => {
        this.topLoaded = true;
        this.checkLoading();
      }
    });
  
    this.cartService.cart$.subscribe((items) => {
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
  addTopItemToCart(topItem: any) {
    const item = this.menu.find(m => String(m._id) === String(topItem._id));
  
    if (item) {
      this.addToCart(item);
    }
  }

  get total() {
    return this.cartService.getTotal();
  }
  addFullItemToCart(item: any) {

    const fullItem = {
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    };
  
    this.cartService.addToCart(fullItem, this.restaurantId);
  }
  checkLoading() {
    this.loading = !(this.menuLoaded && this.topLoaded);
  }
}