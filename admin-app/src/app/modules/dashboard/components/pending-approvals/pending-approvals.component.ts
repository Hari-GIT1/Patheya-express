import {

  Component,
  OnInit

} from '@angular/core';

import { RestaurantsService }
from '../../../../core/services/restaurants.service';

@Component({

  selector: 'app-pending-approvals',

  templateUrl:
    './pending-approvals.component.html',

  styleUrls:
    ['./pending-approvals.component.scss']

})
export class PendingApprovalsComponent
implements OnInit {

  restaurants: any[] = [];

  loading = false;

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

        limit: 5

      })
      .subscribe({

        next: (response) => {
          console.log(
            'Pending Restaurants:',
            response
          );

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