import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/animations';
import { MealEventService } from 'src/app/services/meal-event.service';
import { MenuItem } from 'src/app/types/menuItems';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
  animations: [fadeIn]
})
export class MenuPageComponent implements OnInit {
  menuItems: MenuItem[] = [];
  
  constructor(private mealEventService: MealEventService) { }

  ngOnInit(): void {
    this.loadSelectedMenuItems();
  }

  loadSelectedMenuItems(): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
    if (mealEventId) {
    this.mealEventService.getSelectedMenuItemsForMealEvent(mealEventId).subscribe({
      next: (menuItems) => {
        this.menuItems = menuItems;
        console.log('Menu items loaded:', menuItems);
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
      }
    });
  }
  }


}
