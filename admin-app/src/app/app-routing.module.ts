import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
