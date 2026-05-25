import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { authGuard }
from './core/guards/auth.guard';

import { AdminLayoutComponent }
from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [

  // =========================
  // AUTH
  // =========================

  {

    path: '',

    loadChildren: () =>
      import('./modules/auth/auth.module')
        .then(m => m.AuthModule)

  },

  // =========================
  // PROTECTED ADMIN
  // =========================

  {

    path: '',

    component: AdminLayoutComponent,

    canActivate: [authGuard],

    children: [

      {

        path: 'dashboard',

        loadChildren: () =>
          import('./modules/dashboard/dashboard.module')
            .then(m => m.DashboardModule)

      },

      {

        path: 'orders',

        loadChildren: () =>
          import('./modules/orders/orders.module')
            .then(m => m.OrdersModule)

      },

      {

        path: 'restaurants',

        loadChildren: () =>
          import('./modules/restaurants/restaurants.module')
            .then(m => m.RestaurantsModule)

      },

      {

        path: 'users',

        loadChildren: () =>
          import('./modules/users/users.module')
            .then(m => m.UsersModule)

      },

      {

        path: 'finance',

        loadChildren: () =>
          import('./modules/finance/finance.module')
            .then(m => m.FinanceModule)

      },

      {

        path: 'marketing',

        loadChildren: () =>
          import('./modules/marketing/marketing.module')
            .then(m => m.MarketingModule)

      },

      {

        path: 'support',

        loadChildren: () =>
          import('./modules/support/support.module')
            .then(m => m.SupportModule)

      }

    ]

  },

  // =========================
  // FALLBACK
  // =========================

  {

    path: '**',

    redirectTo: 'dashboard'

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