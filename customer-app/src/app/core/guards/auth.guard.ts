import {

  Injectable

} from '@angular/core';

import {

  CanActivate,

  Router,

  UrlTree

} from '@angular/router';

import {

  AuthService

} from '../services/auth.service';

@Injectable({

  providedIn: 'root'

})

export class AuthGuard
implements CanActivate {

  constructor(

    private authService:
      AuthService,

    private router:
      Router

  ) {}

  canActivate():
  boolean | UrlTree {

    const user =
      this.authService
        .getUser();

    // NOT LOGGED IN
    if (!user) {

      return this.router
        .createUrlTree([

          '/auth/login'

        ]);

    }

    return true;

  }

}