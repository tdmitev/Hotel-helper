import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideFade } from 'src/app/animations/animations';
import { MealItemService } from 'src/app/services/meal-item.service';
import { MenuItem } from 'src/app/types/menuItems';

@Component({
  selector: 'app-menu-items-list',
  templateUrl: './menu-items-list.component.html',
  styleUrls: ['./menu-items-list.component.css'],
  animations: [slideFade]
})
export class MenuItemsListComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private menuItemService: MealItemService, private router: Router) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItemService.getAllMenuItems().subscribe(menuItems => {
      this.menuItems = menuItems;
    });
  }


}
