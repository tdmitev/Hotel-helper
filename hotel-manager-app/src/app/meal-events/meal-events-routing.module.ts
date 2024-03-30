import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealEventListComponent } from './meal-event-list/meal-event-list.component';
import { CreateMealEventComponent } from './create-meal-event/create-meal-event.component';
import { AuthGuard } from '../utils/auth-guard';

const routes: Routes = [{ 
  path: 'meal-events', 
  canActivate: [AuthGuard],
  children: [
    { path: '', component: MealEventListComponent },
    { path: 'create-meal-event', component: CreateMealEventComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealEventsRoutingModule { }
