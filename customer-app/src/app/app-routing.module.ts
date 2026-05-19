import {

  NgModule

} from '@angular/core';

import {

  RouterModule,

  Routes

} from '@angular/router';

const routes: Routes = [

  // AUTH
  {

    path: 'auth',

    loadChildren: () =>

      import(
        './modules/auth/auth.module'
      ).then(

        m => m.AuthModule

      )

  },

  // USER
  {

    path: '',

    loadChildren: () =>

      import(
        './modules/user/user.module'
      ).then(

        m => m.UserModule

      )

  },

  // FALLBACK
  {

    path: '**',

    redirectTo: ''

  }

];

@NgModule({

  imports: [

    RouterModule.forRoot(
      routes
    )

  ],

  exports: [

    RouterModule

  ]

})

export class AppRoutingModule {}