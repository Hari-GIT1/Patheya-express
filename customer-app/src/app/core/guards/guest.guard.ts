import {

  Injectable

} from '@angular/core';

import {

  CanActivate,

  Router

} from '@angular/router';

@Injectable({

  providedIn: 'root'

})

export class GuestGuard
implements CanActivate {

  constructor(

    private router: Router

  ) {}

  canActivate(): boolean {

    const token =

      localStorage.getItem(
        'token'
      );

    // ALREADY LOGGED IN
    if (token) {

      this.router.navigate([
        '/'
      ]);

      return false;

    }

    return true;

  }

}