import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestsRoutingModule } from './guests-routing.module';
import { AddGuestsComponent } from './add-guests/add-guests.component';
import { GuestAttendedPipe } from '../pipes/guest-attended.pipe';


@NgModule({
  declarations: [
    AddGuestsComponent,
    GuestAttendedPipe
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule,
  ]
})
export class GuestsModule { }
