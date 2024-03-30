import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../utils/auth-guard';
import { MenuItemsListComponent } from './menu-items-list/menu-items-list.component';

const routes: Routes = [{ 
  path: 'menu-items', 
  canActivate: [AuthGuard],
  children: [
    { path: '', component: MenuItemsListComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuItemsRoutingModule { }
