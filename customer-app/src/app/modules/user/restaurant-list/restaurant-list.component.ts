import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit, OnChanges {

  @Input() searchTerm: string = ''; // ✅ FIXED

  restaurants: any[] = [];
  filteredRestaurants: any[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe(res => {
      this.restaurants = res;
      this.filteredRestaurants = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterRestaurants(); // ✅ FIXED
  }

  filterRestaurants() {
    const term = this.searchTerm.toLowerCase();

    this.filteredRestaurants = this.restaurants.filter(r =>
      r.name.toLowerCase().includes(term) ||
      r.cuisines.join(',').toLowerCase().includes(term)
    );
  }
  goToDetails(id: string) {
    console.log('Clicked',id);
    this.router.navigate(['/restaurant', id]);
  }
}