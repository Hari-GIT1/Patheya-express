import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AvailableOrdersComponent } from './pages/available-orders/available-orders.component';
import { MyDeliveriesComponent } from './pages/my-deliveries/my-deliveries.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {

  HTTP_INTERCEPTORS

} from '@angular/common/http';

import {

  TokenInterceptor

} from './core/interceptors/token.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav.component';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { LiveDeliveryComponent } from './pages/live-delivery/live-delivery.component';
import {
  GoogleMapsModule
} from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AvailableOrdersComponent,
    MyDeliveriesComponent,
    RegisterComponent,
    NavbarComponent,
    BottomNavComponent,
    AppShellComponent,
    LiveDeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [
    {

      provide:
        HTTP_INTERCEPTORS,
  
      useClass:
        TokenInterceptor,
  
      multi: true
  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
