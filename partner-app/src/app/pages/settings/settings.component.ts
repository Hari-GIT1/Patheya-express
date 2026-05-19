import {

  Component,

  OnInit

} from '@angular/core';

import {

  AuthService

} from 'src/app/core/services/auth.service';

@Component({

  selector: 'app-settings',

  templateUrl: './settings.component.html',

  styleUrls: ['./settings.component.scss']

})

export class SettingsComponent
implements OnInit {

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

  selectedLogo: any = null;

  constructor(

    private authService:
      AuthService

  ) {}

  ngOnInit(): void {

    this.loadSettings();

  }

  // ==============================
  // LOAD SETTINGS
  // ==============================
  loadSettings(): void {

    this.authService
      .getOwnerSettings()
      .subscribe({

        next: (res: any) => {

          this.settings =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ==============================
  // SAVE SETTINGS
  // ==============================
  saveSettings(): void {

    const formData =
      new FormData();

    formData.append(

      'restaurantName',

      this.settings.restaurantName

    );

    formData.append(

      'phone',

      this.settings.phone

    );

    formData.append(

      'email',

      this.settings.email

    );

    formData.append(

      'address',

      this.settings.address

    );

    formData.append(

      'deliveryTime',

      this.settings.deliveryTime

    );

    formData.append(

      'isOpen',

      this.settings.isOpen

    );

    // LOGO
    if (this.selectedLogo) {

      formData.append(

        'logo',

        this.selectedLogo

      );

    }

    this.authService
      .updateOwnerSettings(
        formData
      )
      .subscribe({

        next: () => {

          alert(
            'Settings Updated'
          );

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ==============================
  // CHANGE PASSWORD
  // ==============================
  changePassword(): void {

    console.log(
      this.passwordForm
    );

  }

  // ==============================
  // LOGO SELECT
  // ==============================
  onLogoSelect(
    event: any
  ): void {

    const file =
      event.target.files[0];

    if (!file) return;

    this.selectedLogo =
      file;

    // PREVIEW
    const reader =
      new FileReader();

    reader.onload = () => {

      this.settings.logo =
        reader.result;

    };

    reader.readAsDataURL(file);

  }

}