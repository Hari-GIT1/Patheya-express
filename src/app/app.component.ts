import { Component, OnInit } from '@angular/core';
import { CartService } from './core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  cartCount = 0;
  total = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('storage', () => {
      window.location.reload();
    });
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
      this.total = this.cartService.getTotal();
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}