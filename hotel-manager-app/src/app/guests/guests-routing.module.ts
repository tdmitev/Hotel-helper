import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../utils/auth-guard';
import { AddGuestsComponent } from './add-guests/add-guests.component';

const routes: Routes = [{ 
    path: 'statistics', 
    canActivate: [AuthGuard],
    component: AddGuestsComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestsRoutingModule { }
