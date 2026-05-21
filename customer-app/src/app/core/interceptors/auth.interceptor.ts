import {

  Injectable

} from '@angular/core';

import {

  HttpInterceptor,

  HttpRequest,

  HttpHandler,

  HttpEvent,

  HttpErrorResponse

} from '@angular/common/http';

import {

  Observable,

  throwError

} from 'rxjs';

import {

  catchError

} from 'rxjs/operators';

import {

  Router

} from '@angular/router';

@Injectable()

export class AuthInterceptor
implements HttpInterceptor {

  constructor(

    private router:
      Router

  ) {}

  intercept(

    req: HttpRequest<any>,

    next: HttpHandler

  ): Observable<HttpEvent<any>> {

    const token =
      localStorage.getItem('token');

    // ATTACH TOKEN
    if (token) {

      req = req.clone({

        setHeaders: {

          Authorization:
            `Bearer ${token}`

        }

      });

    }

    // HANDLE ERRORS
    return next.handle(req).pipe(

      catchError(

        (error:
          HttpErrorResponse) => {

          // TOKEN EXPIRED
          if (

            error.status === 401

          ) {

            localStorage.clear();

            this.router.navigate([
              '/auth/login'
            ]);

          }

          return throwError(
            () => error
          );

        }

      )

    );

  }

}