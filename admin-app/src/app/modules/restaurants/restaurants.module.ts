import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { PendingRestaurantsComponent } from './pages/pending-restaurants/pending-restaurants.component';
import { RestaurantDetailsComponent } from './pages/restaurant-details/restaurant-details.component';
import { RestaurantReviewComponent } from './pages/restaurant-review/restaurant-review.component';


@NgModule({
  declarations: [
    PendingRestaurantsComponent,
    RestaurantDetailsComponent,
    RestaurantReviewComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule
  ]
})
export class RestaurantsModule { }
