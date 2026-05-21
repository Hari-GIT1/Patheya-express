import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { LoginComponent }
from './pages/login/login.component';

import { DashboardComponent }
from './pages/dashboard/dashboard.component';

import { OrdersComponent }
from './pages/orders/orders.component';

import { FinanceComponent }
from './pages/finance/finance.component';

import { SupportComponent }
from './pages/support/support.component';

import { MarketingComponent }
from './pages/marketing/marketing.component';

import { AdminManagementComponent }
from './pages/admin-management/admin-management.component';

import { AdminRegisterComponent }
from './pages/admin-register/admin-register.component';

import { AdminLayoutComponent }
from './layouts/admin-layout/admin-layout.component';

import { AuthGuard }
from './core/guards/auth.guard';

import { RoleGuard }
from './core/guards/role.guard';
import { PendingRestaurantsComponent } from './pages/pending-restaurants/pending-restaurants.component';

const routes: Routes = [

  // =========================
  // AUTH ROUTES
  // =========================

  {
    path: 'login',

    component: LoginComponent
  },

  {
    path: 'register',

    component: AdminRegisterComponent
  },

  // =========================
  // PROTECTED ADMIN ROUTES
  // =========================

  
  {
    path: '',

    component: AdminLayoutComponent,

    canActivate: [
      AuthGuard
    ],

    children: [

      {
        path: 'dashboard',

        component: DashboardComponent
      },

      {
        path: 'orders',

        component: OrdersComponent
      },
      {
        path: 'pending-restaurants',
      
        component: PendingRestaurantsComponent,
      
        canActivate: [
          AuthGuard,
          RoleGuard
        ],
      
        data: {
          roles: [
            'super_admin',
            'operations_admin'
          ]
        }
      },
      // =========================
      // ADMIN MANAGEMENT
      // =========================

      {
        path: 'admin-management',

        component:
          AdminManagementComponent,

        canActivate: [
          AuthGuard,
          RoleGuard
        ],

        data: {
          roles: [
            'super_admin'
          ]
        }
      },

      // =========================
      // FINANCE
      // =========================

      {
        path: 'finance',

        component: FinanceComponent,

        canActivate: [
          AuthGuard,
          RoleGuard
        ],

        data: {
          roles: [
            'super_admin',
            'finance_admin'
          ]
        }
      },

      // =========================
      // SUPPORT
      // =========================

      {
        path: 'support',

        component: SupportComponent,

        canActivate: [
          AuthGuard,
          RoleGuard
        ],

        data: {
          roles: [
            'super_admin',
            'support_admin'
          ]
        }
      },

      // =========================
      // MARKETING
      // =========================

      {
        path: 'marketing',

        component: MarketingComponent,

        canActivate: [
          AuthGuard,
          RoleGuard
        ],

        data: {
          roles: [
            'super_admin',
            'marketing_admin'
          ]
        }
      }

    ]
  },

  // =========================
  // DEFAULT REDIRECT
  // =========================

  {
    path: '',

    redirectTo: 'dashboard',

    pathMatch: 'full'
  },

  // =========================
  // FALLBACK
  // =========================

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