import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from './components/sidebar/sidebar.component';

import { HeaderComponent }
from './components/header/header.component';

import { RouterModule }
from '@angular/router';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TableComponent } from './ui/table/table.component';
import { CardComponent } from './ui/card/card.component';
import { ButtonComponent } from './ui/button/button.component';
import { InputComponent } from './ui/input/input.component';
import { ModalComponent } from './ui/modal/modal.component';
import { BadgeComponent } from './ui/badge/badge.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { SearchBoxComponent } from './ui/search-box/search-box.component';
import { StatCardComponent } from './ui/stat-card/stat-card.component';

@NgModule({

  declarations: [

    SidebarComponent,

    HeaderComponent,
     PageLoaderComponent,
     EmptyStateComponent,
     ConfirmDialogComponent,
     TableComponent,
     CardComponent,
     ButtonComponent,
     InputComponent,
     ModalComponent,
     BadgeComponent,
     PaginationComponent,
     SearchBoxComponent,
     StatCardComponent

  ],

  imports: [

    CommonModule,

    RouterModule

  ],

  exports: [

    CommonModule,

    RouterModule,

    SidebarComponent,

    HeaderComponent,
    StatCardComponent,
    TableComponent

  ]

})
export class SharedModule {}