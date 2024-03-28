import { Component, OnInit } from '@angular/core';
import { MealEventService } from 'src/app/services/meal-event.service';
import { MealEvent } from 'src/app/types/meal-event';

@Component({
  selector: 'app-meal-event-list',
  templateUrl: './meal-event-list.component.html',
  styleUrls: ['./meal-event-list.component.css']
})
export class MealEventListComponent implements OnInit {
  mealEvents: MealEvent[] = [];

  constructor(private mealEventService: MealEventService) {}

  ngOnInit() {
    this.loadMealEvents();
  }

  loadMealEvents(): void {
    this.mealEventService.getAllMealEvents().subscribe(mealEvents => {
      this.mealEvents = mealEvents;
    });
  }

  selectMealEvent(eventId: string | undefined): void {
    if (eventId) {
      this.mealEventService.selectMealEvent(eventId).subscribe({
        next: (response) => console.log('Meal event selected successfully', response),
        error: (error) => console.error('Неуспешен избор на mealEvent', error)
      });
    } else {
      console.error('MealEvent ID is undefined');
    }
  }
}
