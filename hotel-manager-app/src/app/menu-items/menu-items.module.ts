import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItemsRoutingModule } from './menu-items-routing.module';
import { MenuItemsListComponent } from './menu-items-list/menu-items-list.component';


@NgModule({
  declarations: [
    MenuItemsListComponent
  ],
  imports: [
    CommonModule,
    MenuItemsRoutingModule
  ]
})
export class MenuItemsModule { }
