import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { OwnerGuard } from './core/guards/owner.guard';

const routes: Routes = [

  // 🔐 AUTH (PUBLIC)
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  // 🏪 OWNER MODULE (PROTECTED INSIDE MODULE)
  {
    path: 'restaurant',
    loadChildren: () =>
      import('./modules/restaurant/restaurant.module').then(m => m.RestaurantModule)
  },

  // 👤 USER MODULE (DEFAULT)
  {
    path: '',
    loadChildren: () =>
      import('./modules/user/user.module').then(m => m.UserModule)
  },

  // ❌ FALLBACK
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
