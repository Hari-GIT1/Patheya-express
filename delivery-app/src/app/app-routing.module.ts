import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AvailableOrdersComponent } from './pages/available-orders/available-orders.component';
import { MyDeliveriesComponent } from './pages/my-deliveries/my-deliveries.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { LiveDeliveryComponent } from './pages/live-delivery/live-delivery.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    children: [
  
      {
        path: 'dashboard',
        component: DashboardComponent
      },
  
      {
        path: 'available-orders',
        component: AvailableOrdersComponent
      },
  
      {
        path: 'my-deliveries',
        component: MyDeliveriesComponent
      },

      {
        path: 'live-delivery/:id',
        component: LiveDeliveryComponent
      },
  
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
