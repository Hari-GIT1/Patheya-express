import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { OwnerRegisterComponent } from './owner-register/owner-register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, OwnerLoginComponent, OwnerRegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AuthModule {}