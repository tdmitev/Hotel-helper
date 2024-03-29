import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealEventsRoutingModule } from './meal-events-routing.module';
import { MealEventListComponent } from './meal-event-list/meal-event-list.component';
import { CreateMealEventComponent } from './create-meal-event/create-meal-event.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MealEventListComponent,
    CreateMealEventComponent
  ],
  imports: [
    CommonModule,
    MealEventsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MealEventsModule { }
