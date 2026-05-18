import { Component, OnInit } from '@angular/core';

import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuItems: any[] = [];

  showAddForm = false;

  newItem = {

    name: '',
    price: '',
    category: 'veg'

  };
showEditModal = false;

showDeleteModal = false;

selectedItem: any = null;

editItem = {

  name: '',

  price: '',

  category: 'veg'

};

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {

    this.getMenuItems();

  }

  getMenuItems(): void {

    this.menuService
      .getMenu()
      .subscribe({

        next: (res: any) => {

          this.menuItems = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  toggleAvailability(item: any): void {

    this.menuService
      .updateAvailability(
        item._id,
        item.isAvailable
      )
      .subscribe({
  
        next: () => {
  
          console.log('Availability updated');
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }
  addMenuItem(): void {

    this.menuService
      .addMenu(this.newItem)
      .subscribe({

        next: () => {

          this.getMenuItems();

          this.showAddForm = false;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  openEditModal(item: any): void {

    this.selectedItem = item;
  
    this.editItem = {
  
      name: item.name,
  
      price: item.price,
  
      category: item.category
  
    };
  
    this.showEditModal = true;
  
  }
  
  openDeleteModal(item: any): void {
  
    this.selectedItem = item;
  
    this.showDeleteModal = true;
  
  }
  updateMenuItem(): void {

    this.menuService
      .updateMenu(
        this.selectedItem._id,
        this.editItem
      )
      .subscribe({
  
        next: (updated: any) => {
  
          this.selectedItem.name =
            updated.name;
  
          this.selectedItem.price =
            updated.price;
  
          this.selectedItem.category =
            updated.category;
  
          this.showEditModal = false;
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }
  deleteMenuItem(): void {

    this.menuService
      .deleteMenu(this.selectedItem._id)
      .subscribe({
  
        next: () => {
  
          this.menuItems =
            this.menuItems.filter(
  
              item =>
                item._id !==
                this.selectedItem._id
  
            );
  
          this.showDeleteModal = false;
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }

}