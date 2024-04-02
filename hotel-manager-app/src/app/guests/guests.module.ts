import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestsRoutingModule } from './guests-routing.module';
import { AddGuestsComponent } from './add-guests/add-guests.component';


@NgModule({
  declarations: [
    AddGuestsComponent
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule,
  ]
})
export class GuestsModule { }
