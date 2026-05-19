import {

  Injectable

} from '@angular/core';

import {

  Observable

} from 'rxjs';

import {

  ApiService

} from './api.service';

@Injectable({

  providedIn: 'root'

})

export class MenuService {

  constructor(

    private api:
      ApiService

  ) {}

  // ==============================
  // GET MENU
  // ==============================
  getMenu(

    restaurantId: string

  ): Observable<any> {

    return this.api.get(

      `menu/${restaurantId}`

    );

  }

  // ==============================
  // ADD ITEM
  // ==============================
  addItem(

    data: FormData

  ): Observable<any> {

    return this.api.post(

      'menu',

      data

    );

  }

  // ==============================
  // UPDATE ITEM
  // ==============================
  updateItem(

    id: string,

    data: FormData

  ): Observable<any> {

    return this.api.put(

      `menu/${id}`,

      data

    );

  }

  // ==============================
  // DELETE ITEM
  // ==============================
  deleteMenuItem(

    id: string

  ): Observable<any> {

    return this.api.delete(

      `menu/${id}`

    );

  }

  // ==============================
  // UPDATE AVAILABILITY
  // ==============================
  updateAvailability(

    id: string,

    isAvailable: boolean

  ): Observable<any> {

    return this.api.patch(

      `menu/${id}/availability`,

      { isAvailable }

    );

  }

}