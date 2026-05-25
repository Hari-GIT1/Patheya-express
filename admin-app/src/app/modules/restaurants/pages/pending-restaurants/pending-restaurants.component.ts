import {

  Component,
  OnInit

} from '@angular/core';

import { RestaurantsService }
from '../../../../core/services/restaurants.service';

@Component({

  selector:
    'app-pending-restaurants',

  templateUrl:
    './pending-restaurants.component.html',

  styleUrls:
    ['./pending-restaurants.component.scss']

})
export class PendingRestaurantsComponent
implements OnInit {

  restaurants: any[] = [];

  loading = false;

  columns = [

    {

      key: 'name',

      label: 'Restaurant'

    },

    {

      key: 'city',

      label: 'City'

    },

    {

      key: 'status',

      label: 'Status'

    }

  ];

  constructor(

    private restaurantsService:
      RestaurantsService

  ) {}

  ngOnInit(): void {

    this.loadRestaurants();

  }

  loadRestaurants(): void {

    this.loading = true;

    this.restaurantsService
      .getPendingRestaurants({

        page: 1,

        limit: 20

      })
      .subscribe({

        next: (response) => {

          this.loading = false;

          this.restaurants =
            response.data;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

}