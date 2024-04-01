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
  currentMenuItemId: string | null = null;

  constructor(private fb: FormBuilder, private menuItemService: MealItemService, private router: Router, private messageService: MessageService, private mealEventService: MealEventService) {
    this.createMenuItemForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required, Validators.minLength(5)]]
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

  onEditMenuItem(menuItemId: string): void {
    const menuItem = this.menuItems.find(item => item._id === menuItemId);
  
    if (!menuItem) {
      console.error('MenuItem not found');
      return;
    }
  
    this.currentMenuItemId = menuItem._id;
    this.createMenuItemForm.patchValue({
      name: menuItem.name,
      image: menuItem.image,
      description: menuItem.description,
      category: menuItem.category
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.createMenuItemForm.valid) {
      const menuItemData = this.createMenuItemForm.value;
  
      if (this.currentMenuItemId) {
        this.menuItemService.editMenuItem(this.currentMenuItemId, menuItemData).subscribe({
          next: () => {
            this.messageService.setMessage('Menu item updated successfully!');
            this.loadMenuItems(); 
            this.createMenuItemForm.reset();
            this.currentMenuItemId = null; 
            this.formSubmitted = false;
          },
          error: (error) => {
            alert('There was an error updating the menu item. Please try again.');
            console.error(error);
          }
        });
      } else {
        if(this.createMenuItemForm.valid) {
        this.menuItemService.createMenuItem(menuItemData).subscribe({
          next: () => {
            this.messageService.setMessage('Menu item created successfully!');
            this.loadMenuItems(); 
            this.createMenuItemForm.reset();
            this.formSubmitted = false;
          },
          error: (error) => {
            alert('There was an error creating the menu item. Please try again.');
            console.error(error);
          }
        });
      }
    }
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

  onDeleteMenuItem(menuItemId: string): void {
    const confirmation = confirm('Are you sure you want to delete this MenuItem?');
    if (!confirmation) {
      return;
    }

    this.menuItemService.deleteMenuItem(menuItemId).subscribe({
      next: () => {
        this.messageService.setMessage('MenuItem deleted successfully');
        console.log('MenuItem deleted successfully');
        this.loadMenuItemsAndMarkSelected();
      },
      error: (error) => console.error('Error deleting MenuItem:', error)
    });
  }

}
