import {

  Component,

  OnInit

} from '@angular/core';

@Component({

  selector: 'app-live-delivery',

  templateUrl:
    './live-delivery.component.html',

  styleUrls: [
    './live-delivery.component.scss'
  ]

})

export class LiveDeliveryComponent
implements OnInit {

  deliveryLocation = {

    lat: 12.9716,

    lng: 77.5946

  };

  destination = {

    lat: 12.9616,

    lng: 77.5846

  };

  directionsService =
    new google.maps
      .DirectionsService();

  directionsResult:
    google.maps
      .DirectionsResult
      | undefined;

  ngOnInit(): void {

    this.drawRoute();

  }

  drawRoute(): void {

    this.directionsService
      .route(

        {

          origin:
            this.deliveryLocation,

          destination:
            this.destination,

          travelMode:
            google.maps
              .TravelMode
              .DRIVING

        },

        (

          result,

          status

        ) => {

          if (

            status === 'OK' &&

            result

          ) {

            this
              .directionsResult =

              result;

          }

        }

      );

  }

}