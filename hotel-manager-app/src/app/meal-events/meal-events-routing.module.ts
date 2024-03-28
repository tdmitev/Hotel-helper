import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealEventListComponent } from './meal-event-list/meal-event-list.component';

const routes: Routes = [
  { path: 'meal-events', component: MealEventListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealEventsRoutingModule { }
