import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [

  // DEFAULT ROUTE
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // LOGIN
  {
    path: 'login',
    component: LoginComponent
  },

  // REGISTER
  {
    path: 'register',
    component: RegisterComponent
  },

  // DASHBOARD
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // MENU
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  },

  // ORDERS
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },

  // ANALYTICS
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },

  // INVALID ROUTES
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
