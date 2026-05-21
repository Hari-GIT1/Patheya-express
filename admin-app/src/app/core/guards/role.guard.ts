import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard
implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {

    const adminData =
      JSON.parse(
        localStorage.getItem(
          'adminData'
        ) || '{}'
      );

    const allowedRoles =
      route.data['roles'];

    if (
      allowedRoles.includes(
        adminData.role
      )
    ) {
      return true;
    }

    this.router.navigate([
      '/dashboard'
    ]);

    return false;
  }
}