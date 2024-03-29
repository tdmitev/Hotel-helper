import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealEventListComponent } from './meal-event-list/meal-event-list.component';
import { CreateMealEventComponent } from './create-meal-event/create-meal-event.component';

const routes: Routes = [
  { path: 'meal-events', component: MealEventListComponent },
  { path: 'meal-events/create-meal-event', component: CreateMealEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealEventsRoutingModule { }
