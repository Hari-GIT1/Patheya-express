import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  loading: boolean = false;
  data: any

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user?.role === 'owner') {
      this.router.navigate(['/restaurant/dashboard']);
    }

    this.loadRestaurants();
  }

  async loadRestaurants() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading restaurants...'
    });

    await loading.present();

    this.restaurantService.getAll().subscribe({
      next: (res) => {
        console.log('API RESPONSE:', res);
        this.restaurants = res as any[];
        loading.dismiss();
      },
      error: async (err) => {
        console.error(err);
        loading.dismiss();
        this.showError();
      }
    });
  }

  openRestaurant(id: string) {
    this.router.navigate(['/restaurant', id]);
  }

  async showError() {
    const toast = await this.toastCtrl.create({
      message: 'Failed to load restaurants',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  getFilteredRestaurants() {
    let data = [...this.restaurants];

    if (this.searchTerm) {
      data = data.filter(r =>
        r.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory !== 'all') {
      data = data.filter(r => r.category === this.selectedCategory);
    }

    if (this.sortOption === 'rating') {
      data.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
    }

    if (this.sortOption === 'delivery') {
      data.sort((a, b) => (a.deliveryTime || 0) - (b.deliveryTime || 0));
    }

    return data;
  }
}