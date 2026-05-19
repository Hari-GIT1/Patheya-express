import {

  Component,

  OnInit

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  RestaurantService

} from '../../../core/services/restaurant.service';

@Component({

  selector: 'app-home',

  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss']

})

export class HomeComponent
implements OnInit {

  restaurants: any[] = [];

  searchTerm = '';

  selectedCategory = 'all';

  sortOption = '';

  loading = false;

  constructor(

    private router: Router,

    private restaurantService:
      RestaurantService

  ) {}

  ngOnInit(): void {

    const user = JSON.parse(

      localStorage.getItem('user')
      || 'null'

    );

    if (
      user?.role ===
      'restaurant_owner'
    ) {

      this.router.navigate([
        '/restaurant/dashboard'
      ]);

    }

    this.loadRestaurants();

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

          this.loading = false;

        },

        error: (err: any) => {

          console.error(err);

          this.restaurants = [];

          this.loading = false;

        }

      });

  }

  // ==============================
  // OPEN RESTAURANT
  // ==============================
  openRestaurant(
    id: string
  ): void {

    this.router.navigate([
      '/restaurant',
      id
    ]);

  }

  // ==============================
  // FILTERED RESTAURANTS
  // ==============================
  get filteredRestaurants(): any[] {

    if (
      !Array.isArray(
        this.restaurants
      )
    ) {

      return [];

    }

    let data = [
      ...this.restaurants
    ];

    // SEARCH
    if (this.searchTerm) {

      data = data.filter(

        (r: any) =>

          r.name
            ?.toLowerCase()
            .includes(

              this.searchTerm
                .toLowerCase()

            )

      );

    }

    // CATEGORY
    if (
      this.selectedCategory !==
      'all'
    ) {

      data = data.filter(

        (r: any) =>

          r.category ===
          this.selectedCategory

      );

    }

    // SORT
    if (
      this.sortOption ===
      'rating'
    ) {

      data.sort(

        (a: any, b: any) =>

          (b.rating || 0)
          -
          (a.rating || 0)

      );

    }

    if (
      this.sortOption ===
      'delivery'
    ) {

      data.sort(

        (a: any, b: any) =>

          (a.deliveryTime || 0)
          -
          (b.deliveryTime || 0)

      );

    }

    return data;

  }

}