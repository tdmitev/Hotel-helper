import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideFade } from 'src/app/animations/animations';
import { MealItemService } from 'src/app/services/meal-item.service';
import { MenuItem } from 'src/app/types/menuItems';
import { MessageService } from 'src/app/services/message.service';

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

  constructor(private fb: FormBuilder, private menuItemService: MealItemService, private router: Router, private messageService: MessageService) {
    this.createMenuItemForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMenuItems();
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

  addMenuItem(itemId: string): void {
    const mealEventId = sessionStorage.getItem('mealEventId');

  }

}
