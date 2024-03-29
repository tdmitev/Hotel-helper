import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MealItemService} from 'src/app/services/meal-item.service';
import { MenuItem } from 'src/app/types/menuItems';

@Component({
  selector: 'app-create-meal-event',
  templateUrl: './create-meal-event.component.html',
  styleUrls: ['./create-meal-event.component.css']
})
export class CreateMealEventComponent implements OnInit {
  createMealEventForm: FormGroup;
  mealTypes = ['breakfast', 'lunch', 'dinner']; 
  menuItems: MenuItem[] = []; 

  constructor(
    private fb: FormBuilder,
    private mealEventService: MealItemService
  ) {
    this.createMealEventForm = this.fb.group({
      date: ['', Validators.required],
      mealType: ['', Validators.required],
      menuItems: [[]] 
    });
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.mealEventService.getAllMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
      },
      error: (error) => {
        console.error('Error loading menu items', error);
      }
    });
  }


}