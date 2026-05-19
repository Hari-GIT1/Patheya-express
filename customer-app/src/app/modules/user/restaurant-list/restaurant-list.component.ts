import {

  Component,

  Input,

  OnInit,

  OnChanges,

  SimpleChanges

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  RestaurantService

} from '../../../core/services/restaurant.service';

@Component({

  selector: 'app-restaurant-list',

  templateUrl:
    './restaurant-list.component.html',

  styleUrls: [
    './restaurant-list.component.scss'
  ]

})

export class RestaurantListComponent
implements OnInit, OnChanges {

  @Input()
  searchTerm = '';

  restaurants: any[] = [];

  filteredRestaurants: any[] = [];

  loading = false;

  constructor(

    private restaurantService:
      RestaurantService,

    private router: Router

  ) {}

  ngOnInit(): void {

    this.loadRestaurants();

  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    this.filterRestaurants();

  }

  // ==============================
  // LOAD RESTAURANTS
  // ==============================
  loadRestaurants(): void {

    this.loading = true;

    this.restaurantService
      .getAll()
      .subscribe({

        next: (res: any) => {

          console.log(
            'RESTAURANTS:',
            res
          );

          this.restaurants =
          Array.isArray(res)
            ? res
            : res.data || [];

          this.filteredRestaurants =
            [...this.restaurants];

          this.loading = false;

        },

        error: (err: any) => {

          console.error(err);

          this.restaurants = [];

          this.filteredRestaurants = [];

          this.loading = false;

        }

      });

  }

  // ==============================
  // FILTER RESTAURANTS
  // ==============================
  filterRestaurants(): void {

    const term =
      this.searchTerm
        .toLowerCase();

    this.filteredRestaurants =
      this.restaurants.filter(

        (r: any) =>

          r.name
            ?.toLowerCase()
            .includes(term)

          ||

          r.cuisines
            ?.join(', ')
            .toLowerCase()
            .includes(term)

      );

  }

  // ==============================
  // OPEN DETAILS
  // ==============================
  goToDetails(
    id: string
  ): void {

    console.log(
      'OPEN RESTAURANT:',
      id
    );

    this.router.navigate([
      '/restaurant',
      id
    ]);

  }
// ==============================
// TRACK BY
// ==============================
trackByRestaurant(
  index: number,
  item: any
): string {

  return item._id;

}

}