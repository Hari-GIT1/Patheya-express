import {

  NgModule

} from '@angular/core';

import {

  RouterModule,

  Routes

} from '@angular/router';

import {

  LoginComponent

} from './pages/login/login.component';

import {

  RegisterComponent

} from './pages/register/register.component';

import {

  DashboardComponent

} from './pages/dashboard/dashboard.component';

import {

  MenuComponent

} from './pages/menu/menu.component';

import {

  OrdersComponent

} from './pages/orders/orders.component';

import {

  AnalyticsComponent

} from './pages/analytics/analytics.component';

import {

  OrderHistoryComponent

} from './pages/order-history/order-history.component';

import {

  SettingsComponent

} from './pages/settings/settings.component';

import {

  AuthGuard

} from './core/guards/auth.guard';

import {
  GuestGuard
} from './core/guards/guest.guard';

const routes: Routes = [

  // ==============================
  // DEFAULT
  // ==============================
  {

    path: '',

    redirectTo: 'login',

    pathMatch: 'full'

  },

  // ==============================
  // AUTH
  // ==============================
  {
    path: 'login',
  
    component: LoginComponent,
  
    canActivate: [GuestGuard]
  },

  {
    path: 'register',
  
    component: RegisterComponent,
  
    canActivate: [GuestGuard]
  },

  // ==============================
  // DASHBOARD
  // ==============================
  {

    path: 'dashboard',

    component: DashboardComponent,

    canActivate: [AuthGuard]

  },

  // ==============================
  // MENU
  // ==============================
  {

    path: 'menu',

    component: MenuComponent,

    canActivate: [AuthGuard]

  },

  // ==============================
  // ORDERS
  // ==============================
  {

    path: 'orders',

    component: OrdersComponent,

    canActivate: [AuthGuard]

  },

  // ==============================
  // ANALYTICS
  // ==============================
  {

    path: 'analytics',

    component: AnalyticsComponent,

    canActivate: [AuthGuard]

  },

  // ==============================
  // ORDER HISTORY
  // ==============================
  {

    path: 'order-history',

    component: OrderHistoryComponent,

    canActivate: [AuthGuard]

  },

  // ==============================
  // SETTINGS
  // ==============================
  {

    path: 'settings',

    component: SettingsComponent,

    canActivate: [AuthGuard]

  },

  // ==============================
  // INVALID ROUTES
  // ==============================
  {

    path: '**',

    redirectTo: 'login'

  }

];

@NgModule({

  imports: [

    RouterModule.forRoot(routes)

  ],

  exports: [

    RouterModule

  ]

})

export class AppRoutingModule {}