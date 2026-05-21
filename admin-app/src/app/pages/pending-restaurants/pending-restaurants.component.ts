import {
  Component,
  OnInit
} from '@angular/core';

import { RestaurantAdminService }
from 'src/app/core/services/restaurant-admin.service';

@Component({
  selector:
    'app-pending-restaurants',

  templateUrl:
    './pending-restaurants.component.html',

  styleUrls: [
    './pending-restaurants.component.scss'
  ]
})

export class PendingRestaurantsComponent
implements OnInit {

  restaurants: any[] = [];

  loading = true;

  constructor(

    private restaurantService:
    RestaurantAdminService

  ) {}

  ngOnInit(): void {

    this.loadRestaurants();

  }

  loadRestaurants(): void {

    this.restaurantService
      .getPendingRestaurants()
      .subscribe({

        next: (res: any) => {

          this.restaurants =
            res.data;
          console.log(res.data)

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  approveRestaurant(
    id: string
  ): void {

    this.restaurantService
      .approveRestaurant(id)
      .subscribe({

        next: () => {

          this.loadRestaurants();

        }

      });

  }

  rejectRestaurant(
    id: string
  ): void {

    const reason =
      prompt(
        'Enter rejection reason'
      );

    if (!reason) return;

    this.restaurantService
      .rejectRestaurant(
        id,
        reason
      )
      .subscribe({

        next: () => {

          this.loadRestaurants();

        }

      });

  }

}