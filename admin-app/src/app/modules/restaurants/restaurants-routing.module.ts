import { NgModule }
from '@angular/core';

import {

  RouterModule,
  Routes

} from '@angular/router';

import { PendingRestaurantsComponent }
from './pages/pending-restaurants/pending-restaurants.component';

import { RestaurantReviewComponent }
from './pages/restaurant-review/restaurant-review.component';

const routes: Routes = [

  {

    path: '',

    component:
      PendingRestaurantsComponent

  },

  {

    path: ':id',

    component:
      RestaurantReviewComponent

  }

];

@NgModule({

  imports: [

    RouterModule.forChild(
      routes
    )

  ],

  exports: [

    RouterModule

  ]

})
export class RestaurantsRoutingModule {}