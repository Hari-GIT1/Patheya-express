import { NgModule }
from '@angular/core';

import { BrowserModule }
from '@angular/platform-browser';

import {

  provideHttpClient,
  withInterceptors

} from '@angular/common/http';

import { AppRoutingModule }
from './app-routing.module';

import { AppComponent }
from './app.component';

import { SharedModule }
from './shared/shared.module';

import { CoreModule }
from './core/core.module';

import { AdminLayoutComponent }
from './layouts/admin-layout/admin-layout.component';

import {

  authInterceptor

} from './core/interceptors/auth.interceptor';

import {

  errorInterceptor

} from './core/interceptors/error.interceptor';

@NgModule({

  declarations: [

    AppComponent,

    AdminLayoutComponent

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    SharedModule,

    CoreModule

  ],

  providers: [

    provideHttpClient(

      withInterceptors([

        authInterceptor,

        errorInterceptor

      ])

    )

  ],

  bootstrap: [

    AppComponent

  ]

})
export class AppModule {}