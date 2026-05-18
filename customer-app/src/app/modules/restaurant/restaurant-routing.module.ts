import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [

  // 📊 DASHBOARD
  {
    path: 'dashboard',
    component: RestaurantDashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'owner' }
  },

  // 🍱 MENU MANAGEMENT
  {
    path: 'menu',
    component: MenuManagementComponent,
    canActivate: [RoleGuard],
    data: { role: 'owner' }
  },

  // 📦 ORDER MANAGEMENT
  {
    path: 'orders',
    component: RestaurantOrdersComponent,
    canActivate: [RoleGuard],
    data: { role: 'owner' }
  },

  // 🔁 DEFAULT REDIRECT
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {}