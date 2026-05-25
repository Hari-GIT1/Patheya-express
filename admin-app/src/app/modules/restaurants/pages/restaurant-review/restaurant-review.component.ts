import {

  Component,
  OnInit

} from '@angular/core';

import {

  ActivatedRoute,
  Router

} from '@angular/router';

import { RestaurantsService }
from '../../../../core/services/restaurants.service';

@Component({

  selector:
    'app-restaurant-review',

  templateUrl:
    './restaurant-review.component.html',

  styleUrls:
    ['./restaurant-review.component.scss']

})
export class RestaurantReviewComponent
implements OnInit {

  restaurant: any = null;

  loading = false;

  actionLoading = false;

  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private restaurantsService:
      RestaurantsService

  ) {}

  ngOnInit(): void {

    this.loadRestaurant();

  }

  loadRestaurant(): void {

    const id =
      this.route.snapshot
        .paramMap
        .get('id');

    if (!id) return;

    this.loading = true;

    this.restaurantsService
      .getRestaurantById(id)
      .subscribe({

        next: (response) => {

          this.loading = false;

          this.restaurant =
            response.data;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  updateStatus(
    status: string
  ): void {

    if (!this.restaurant) return;

    this.actionLoading = true;

    this.restaurantsService
      .updateRestaurantStatus(

        this.restaurant._id,

        status

      )
      .subscribe({

        next: () => {

          this.actionLoading = false;

          this.router.navigate([
            '/restaurants'
          ]);

        },

        error: () => {

          this.actionLoading = false;

        }

      });

  }

}