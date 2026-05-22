import {

  Component,

  OnInit,

  OnDestroy

} from '@angular/core';

import {
  AuthService
} from 'src/app/core/services/auth.service';

import {
  SocketService
} from 'src/app/core/services/socket.service';

@Component({

  selector: 'app-dashboard',

  templateUrl:
    './dashboard.component.html',

  styleUrls: [
    './dashboard.component.scss'
  ]

})

export class DashboardComponent
implements OnInit, OnDestroy {

  watchId: any;

  constructor(

    private authService:
      AuthService,

    private socketService:
      SocketService

  ) {}

  ngOnInit(): void {

    const user =
      this.authService.getUser();

    // ==========================
    // JOIN DELIVERY ROOM
    // ==========================

    if (user?._id) {

      this.socketService
        .joinDeliveryRoom(

          user._id

        );

    }

    // ==========================
    // START GPS TRACKING
    // ==========================

    this.startTracking();

  }

  // ==============================
  // START TRACKING
  // ==============================

  startTracking(): void {

    if (!navigator.geolocation) {

      console.log(
        'Geolocation not supported'
      );

      return;

    }

    this.watchId =
      navigator.geolocation.watchPosition(

        (position) => {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          console.log(

            'GPS LOCATION:',

            latitude,

            longitude

          );

          // ======================
          // SEND LOCATION
          // ======================

          this.socketService
            .sendLocation({

              orderId:
                'TEST_ORDER_ID',

              latitude,

              longitude

            });

        },

        (error) => {

          console.log(error);

        },

        {

          enableHighAccuracy: true,

          maximumAge: 0,

          timeout: 5000

        }

      );

  }

  // ==============================
  // DESTROY
  // ==============================

  ngOnDestroy(): void {

    if (this.watchId) {

      navigator.geolocation
        .clearWatch(

          this.watchId

        );

    }

  }

}