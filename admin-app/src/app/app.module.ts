import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { SupportComponent } from './pages/support/support.component';
import { MarketingComponent } from './pages/marketing/marketing.component';
import { AdminManagementComponent } from './pages/admin-management/admin-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PendingRestaurantsComponent } from './pages/pending-restaurants/pending-restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminLayoutComponent,
    DataTableComponent,
    OrdersComponent,
    AdminRegisterComponent,
    FinanceComponent,
    SupportComponent,
    MarketingComponent,
    AdminManagementComponent,
    PendingRestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {

      provide:
        HTTP_INTERCEPTORS,
  
      useClass:
        AuthInterceptor,
  
      multi: true
  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
