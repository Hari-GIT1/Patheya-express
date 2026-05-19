import {

  Component,

  OnInit

} from '@angular/core';

import {

  MenuService

} from 'src/app/core/services/menu.service';

@Component({

  selector: 'app-menu',

  templateUrl: './menu.component.html',

  styleUrls: ['./menu.component.scss']

})

export class MenuComponent
implements OnInit {

  menuItems: any[] = [];

  showAddForm = false;

  showEditModal = false;

  showDeleteModal = false;

  selectedItem: any = null;

  newItem = {

    name: '',

    price: '',

    category: 'veg'

  };

  editItem = {

    name: '',

    price: '',

    category: 'veg'

  };

  selectedImage: any = null;

  constructor(

    private menuService:
      MenuService

  ) {}

  ngOnInit(): void {

    this.getMenuItems();

  }

  // ==============================
  // GET MENU ITEMS
  // ==============================
  getMenuItems(): void {

    this.menuService
      .getMenu()
      .subscribe({

        next: (res: any) => {

          this.menuItems =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ==============================
  // ADD MENU ITEM
  // ==============================
  addMenuItem(): void {

    const formData =
      new FormData();
  
    formData.append(
  
      'name',
  
      this.newItem.name
  
    );
  
    formData.append(
  
      'price',
  
      this.newItem.price
  
    );
  
    formData.append(
  
      'category',
  
      this.newItem.category
  
    );
  
    if (this.selectedImage) {
  
      formData.append(
  
        'image',
  
        this.selectedImage
  
      );
  
    }
  
    this.menuService
      .addMenu(formData)
      .subscribe({
  
        next: (res: any) => {
  
          this.menuItems.unshift(
            res.data
          );
  
          this.showAddForm =
            false;
  
          this.newItem = {
  
            name: '',
  
            price: '',
  
            category: 'veg'
  
          };
  
          this.selectedImage =
            null;
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }

  // ==============================
  // TOGGLE AVAILABILITY
  // ==============================
  toggleAvailability(
    item: any
  ): void {

    this.menuService
      .updateAvailability(

        item._id,

        item.isAvailable

      )
      .subscribe({

        next: (res: any) => {

          item.isAvailable =
            res.data.isAvailable;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ==============================
  // OPEN EDIT MODAL
  // ==============================
  openEditModal(
    item: any
  ): void {

    this.selectedItem =
      item;

    this.editItem = {

      name: item.name,

      price: item.price,

      category: item.category

    };

    this.showEditModal =
      true;

  }

  // ==============================
  // UPDATE MENU ITEM
  // ==============================
  updateMenuItem(): void {

    this.menuService
      .updateMenu(

        this.selectedItem._id,

        this.editItem

      )
      .subscribe({

        next: (res: any) => {

          const updated =
            res.data;

          this.selectedItem.name =
            updated.name;

          this.selectedItem.price =
            updated.price;

          this.selectedItem.category =
            updated.category;

          this.showEditModal =
            false;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ==============================
  // OPEN DELETE MODAL
  // ==============================
  openDeleteModal(
    item: any
  ): void {

    this.selectedItem =
      item;

    this.showDeleteModal =
      true;

  }

  // ==============================
  // DELETE MENU ITEM
  // ==============================
  deleteMenuItem(): void {

    this.menuService
      .deleteMenu(
        this.selectedItem._id
      )
      .subscribe({

        next: () => {

          this.menuItems =

            this.menuItems.filter(

              item =>

                item._id !==
                this.selectedItem._id

            );

          this.showDeleteModal =
            false;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  onImageSelect(
    event: any
  ): void {
  
    this.selectedImage =
      event.target.files[0];
  
  }

}