import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuPageComponent } from './menu-page/menu-page.component';


@NgModule({
  declarations: [
    MenuPageComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
