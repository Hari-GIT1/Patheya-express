import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit {

  menuItems: any[] = [];
  searchText = '';
  selectedCategory = 'all';
  sortOption = '';

  editingItemId: string | null = null;
  selectedFile!: File;

  form = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    category: ['veg', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.menuService.getMenu(user.restaurantId).subscribe({
      next: (res: any[]) => {
        this.menuItems = res;
        console.log('MENU:', res);
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addItem() {

    if (this.form.invalid) return;

    const formData = new FormData();

    formData.append('name', this.form.value.name!);
    formData.append('price', this.form.value.price!);
    formData.append('category', this.form.value.category!);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // 🔄 EDIT
    if (this.editingItemId) {

      this.menuService.updateItem(this.editingItemId, formData)
        .subscribe(() => {
          this.resetForm();
          this.loadMenu();
        });

    } else {

      // ➕ ADD
      this.menuService.addItem(formData)
        .subscribe(() => {
          this.resetForm();
          this.loadMenu();
        });
    }
  }

  editItem(item: any) {
    this.form.patchValue({
      name: item.name,
      price: item.price,
      category: item.category
    });

    this.editingItemId = item._id;
  }

  deleteItem(id: string) {
    if (!confirm('Delete this item?')) return;

    this.menuService.deleteMenuItem(id).subscribe(() => {
      this.loadMenu();
    });
  }

  resetForm() {
    this.form.reset({ category: 'veg' });
    this.editingItemId = null;
    this.selectedFile = undefined!;
  }

  get filteredMenuItems() {
    let items = [...this.menuItems];

    if (this.searchText) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.selectedCategory !== 'all') {
      items = items.filter(item =>
        item.category === this.selectedCategory
      );
    }

    if (this.sortOption === 'priceLow') {
      items.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'priceHigh') {
      items.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }
}