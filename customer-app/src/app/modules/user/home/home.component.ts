import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../core/services/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  restaurants: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortOption: string = '';

  constructor(
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user?.role === 'owner') {
      this.router.navigate(['/restaurant/dashboard']);
    }

    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getAll().subscribe({
      next: (res) => {
        this.restaurants = res;
      },
      error: (err) => console.error(err)
    });
  }

  openRestaurant(id: string) {
    this.router.navigate(['/restaurant', id]);
  }

  // 🔥 FILTER + SEARCH + SORT
  get filteredRestaurants() {
    let data = [...this.restaurants];

    // search
    if (this.searchTerm) {
      data = data.filter(r =>
        r.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // category
    if (this.selectedCategory !== 'all') {
      data = data.filter(r => r.category === this.selectedCategory);
    }

    // sort
    if (this.sortOption === 'rating') {
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (this.sortOption === 'delivery') {
      data.sort((a, b) => (a.deliveryTime || 0) - (b.deliveryTime || 0));
    }

    return data;
  }
}