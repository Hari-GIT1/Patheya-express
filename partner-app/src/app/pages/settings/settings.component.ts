import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: any = {

    restaurantName: '',

    phone: '',

    email: '',

    address: '',

    deliveryTime: '',

    logo: '',

    isOpen: true

  };

  passwordForm = {

    currentPassword: '',

    newPassword: ''

  };

  constructor(private AuthService:AuthService
    
  ) {}
  ngOnInit(): void {

    this.loadSettings();

  }
  loadSettings(): void {

    this.AuthService
      .getOwnerSettings()
      .subscribe({

        next: (res: any) => {

          this.settings = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  saveSettings(): void {

    this.AuthService
      .updateOwnerSettings(this.settings)
      .subscribe({

        next: () => {

          alert('Settings Updated');

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  changePassword(): void {

    console.log(this.passwordForm);

  }

  onLogoSelect(event: any): void {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.settings.logo = reader.result;

    };

    reader.readAsDataURL(file);

  }

}
