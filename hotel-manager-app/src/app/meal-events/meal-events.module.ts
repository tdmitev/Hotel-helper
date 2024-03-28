import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealEventsRoutingModule } from './meal-events-routing.module';
import { MealEventListComponent } from './meal-event-list/meal-event-list.component';


@NgModule({
  declarations: [
    MealEventListComponent
  ],
  imports: [
    CommonModule,
    MealEventsRoutingModule
  ]
})
export class MealEventsModule { }
