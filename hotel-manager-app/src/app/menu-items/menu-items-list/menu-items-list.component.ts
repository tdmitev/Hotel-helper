import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideFade } from 'src/app/animations/animations';
import { MealItemService } from 'src/app/services/meal-item.service';
import { MenuItem } from 'src/app/types/menuItems';
import { MessageService } from 'src/app/services/message.service';
import { MealEventService } from 'src/app/services/meal-event.service';

@Component({
  selector: 'app-menu-items-list',
  templateUrl: './menu-items-list.component.html',
  styleUrls: ['./menu-items-list.component.css'],
  animations: [slideFade]
})
export class MenuItemsListComponent implements OnInit {
  menuItems: MenuItem[] = [];
  createMenuItemForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private menuItemService: MealItemService, private router: Router, private messageService: MessageService, private mealEventService: MealEventService) {
    this.createMenuItemForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMenuItemsAndMarkSelected();
  }

  loadMenuItemsAndMarkSelected(): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
    if (mealEventId) {
      this.mealEventService.getSelectedMenuItemsForMealEvent(mealEventId).subscribe(selectedItems => {
        const selectedIds = selectedItems.map(item => item._id);
        this.menuItemService.getAllMenuItems().subscribe(allItems => {
          this.menuItems = allItems.map(item => ({
            ...item,
            selected: selectedIds.includes(item._id)
          }));
        });
      });
    } else {
      this.loadMenuItems();
    }
  }

  loadMenuItems(): void {
    this.menuItemService.getAllMenuItems().subscribe(menuItems => {
      this.menuItems = menuItems;
    });
  }

  onSubmit(): void {
 
    this.formSubmitted = true;
    if (this.createMenuItemForm.valid) {
      const menuItem = this.createMenuItemForm.value;

      this.menuItemService.createMenuItem(menuItem).subscribe({
        next: () => {
          this.messageService.setMessage('Menu item created successfully!');
          this.loadMenuItems();
          this.createMenuItemForm.reset();
        },
        error: (error) => {
          alert('There was an error creating the menu item. Please try again.');
          console.error(error);
        }
      });
    }
  }

  addMenuItemToMealEvent(itemId: string): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
      
    console.log('mealEventId', mealEventId);
    if (!mealEventId) {
      this.messageService.setMessage('No meal event selected. Please select a meal event first.', 'error');
      return;
    }
    this.mealEventService.getSelectedMenuItemsForMealEvent(mealEventId).subscribe({
      next: (selectedItems) => {
        const selectedIds = selectedItems.map(item => item._id);
        if (selectedIds.includes(itemId)) {
          this.messageService.setMessage('This menu item is already added to the meal event.', 'error');
          console.log('This menu item is already added to the meal event.');
        } else {
          this.mealEventService.addMenuItemToMealEvent(mealEventId, itemId).subscribe({
            next: () => {
              this.loadMenuItemsAndMarkSelected();
              this.messageService.setMessage('Menu item added to meal event successfully!');
              console.log('Menu item added to meal event successfully!');
            },
            error: (error) => {
              alert('There was an error adding the menu item to the meal event. Please try again.');
              console.error(error);
            }
          });
        }
      },
      error: (error) => {
        alert('There was an error retrieving the selected menu items. Please try again.');
        console.error(error);
      }
    });
  }

  removeMenuItemFromMealEvent(itemId: string): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
    
    if (!mealEventId) {
      this.messageService.setMessage('No meal event selected. Please select a meal event first.', 'error');
      return;
    }
  
    this.mealEventService.getSelectedMenuItemsForMealEvent(mealEventId).subscribe({
      next: (selectedItems) => {
        const selectedIds = selectedItems.map(item => item._id);
        if (!selectedIds.includes(itemId)) {
          this.messageService.setMessage('This menu item was not added to the meal event.', 'error');
          console.log('This menu item was not added to the meal event.');
        } else {
          this.mealEventService.removeMenuItemFromMealEvent(itemId).subscribe({
            next: () => {
              this.loadMenuItemsAndMarkSelected(); 
              this.messageService.setMessage('Menu item removed from meal event successfully!');
              console.log('Menu item removed from meal event successfully!');
            },
            error: (error) => {
              alert('There was an error removing the menu item from the meal event. Please try again.');
              console.error(error);
            }
          });
        }
      },
      error: (error) => {
        alert('There was an error retrieving the selected menu items. Please try again.');
        console.error(error);
      }
    });
  }
}
