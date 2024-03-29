import { Component, OnInit } from '@angular/core';
import { fadeIn, slideFade } from 'src/app/animations/animations';
import { MealEventService } from 'src/app/services/meal-event.service';
import { MealEvent } from 'src/app/types/meal-event';

@Component({
  selector: 'app-meal-event-list',
  templateUrl: './meal-event-list.component.html',
  styleUrls: ['./meal-event-list.component.css'],
  animations: [slideFade, fadeIn]
})
export class MealEventListComponent implements OnInit {
  mealEvents: MealEvent[] = [];
  selectedMealEventId: string | null | undefined = null;

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
      this.selectedMealEventId = eventId;
      this.mealEventService.selectMealEvent(eventId).subscribe({
        next: (response) => console.log('Meal event selected successfully', response),
        error: (error) => console.error('Неуспешен избор на mealEvent', error)
      });
    } else {
      this.selectedMealEventId = null;
      console.error('MealEvent ID is undefined');
    }
  }

  removeMealEvent(): void {
    this.mealEventService.deselectMealEvent().subscribe({
      next: (response) => {
        console.log('Meal event deselected successfully', response);
        this.selectedMealEventId = null;
        this.loadMealEvents();
      },
      error: (error) => console.error('Неуспешно деселектиране на mealEvent', error)
    });
  }

  deleteMealEvent(mealEventId: string): void {
    this.mealEventService.deleteMealEvent(mealEventId).subscribe({
      next: (response) => {
        console.log('Meal event deleted successfully', response);
        this.loadMealEvents();
      },
      error: (error) => console.error('Неуспешно изтриване на mealEvent', error)
    });
  }

}
