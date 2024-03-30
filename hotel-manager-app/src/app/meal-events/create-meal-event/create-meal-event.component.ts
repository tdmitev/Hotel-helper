import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideFade } from 'src/app/animations/animations';
import { MealEventService } from 'src/app/services/meal-event.service';
import {MealItemService} from 'src/app/services/meal-item.service';
import { MealEvent } from 'src/app/types/meal-event';
import { MenuItem } from 'src/app/types/menuItems';

@Component({
  selector: 'app-create-meal-event',
  templateUrl: './create-meal-event.component.html',
  styleUrls: ['./create-meal-event.component.css'],
  animations: [slideFade]
})
export class CreateMealEventComponent implements OnInit {
  createMealEventForm: FormGroup;
  mealTypes = ['breakfast', 'lunch', 'dinner'];
  menuItems: MenuItem[] = [];
  selectedMenuItems: string[] = [];

  constructor(private fb: FormBuilder, private mealEventService: MealEventService, private MealItemService: MealItemService, private router: Router) {
    this.createMealEventForm = this.fb.group({
      date: ['', Validators.required],
      mealType: ['', Validators.required],
      menuItems: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  
  addMenuItem(itemId: string): void {
    if (!this.selectedMenuItems.includes(itemId)) {
      this.selectedMenuItems.push(itemId);
      console.log('selectedMenuItems:', this.selectedMenuItems);
    }
  }

  removeMenuItem(itemId: string): void {
    this.selectedMenuItems = this.selectedMenuItems.filter(item => item !== itemId);
    console.log('selectedMenuItems:', this.selectedMenuItems);
  }

  onSubmit(): void {
    console.log('Form Submitted', this.createMealEventForm.value);
    console.log('Is Form Valid?', this.createMealEventForm.valid);
    console.log('Selected menu items:', this.selectedMenuItems);
  
    this.createMealEventForm.setControl('menuItems', this.fb.array(this.selectedMenuItems || []));
  
    console.log('Updated Form Values:', this.createMealEventForm.value);
  
    if (this.createMealEventForm.valid) {
      const mealEvent = this.createMealEventForm.value;
      
      this.mealEventService.createMealEvent(mealEvent).subscribe({
        next: (response) => {
          alert('Meal event created successfully!');
          this.createMealEventForm.reset();
          this.router.navigate(['/meal-events']);
        },
        error: (error) => {
          alert('There was an error creating the meal event. Please try again.');
          console.error('Error creating meal event:', error);
        }
      });
    }
  }

  loadMenuItems(): void {
    this.MealItemService.getAllMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        this.menuItems = items.map(item => ({
          ...item,
          selected: false 
        }));
      },
      error: (error) => {
        console.error('Error loading menu items', error);
      }
    });
  }


}