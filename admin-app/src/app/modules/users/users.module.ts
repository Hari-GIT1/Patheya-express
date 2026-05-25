import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdminManagementComponent } from './pages/admin-management/admin-management.component';
import { CustomerManagementComponent } from './pages/customer-management/customer-management.component';


@NgModule({
  declarations: [
    AdminManagementComponent,
    CustomerManagementComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
