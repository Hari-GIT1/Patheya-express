import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [

  // 🏠 HOME (PUBLIC)
  {
    path: '',
    component: HomeComponent
  },

  // 🍽 RESTAURANT MENU
  {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent
  },

  // 🛒 CART
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [RoleGuard],
    data: { role: 'user' }
  },

  // 💳 CHECKOUT
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [RoleGuard],
    data: { role: 'user' }
  },

  // 📦 MY ORDERS
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [RoleGuard],
    data: { role: 'user' }
  },

  // 📍 TRACK ORDER
  {
    path: 'track-order/:id',
    component: TrackOrderComponent,
    canActivate: [RoleGuard],
    data: { role: 'user' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}