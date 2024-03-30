import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn, slideFade } from 'src/app/animations/animations';
import { MealEventService } from 'src/app/services/meal-event.service';
import { MessageService } from 'src/app/services/message.service';
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
  message: string | null = null;
  constructor(private mealEventService: MealEventService, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.loadMealEvents();
    const storedSelectedMealEventId = sessionStorage.getItem('selectedMealEventId');
    if (storedSelectedMealEventId) {
      this.selectedMealEventId = storedSelectedMealEventId;
    }
    this.messageService.getMessage().subscribe((message) => {
      this.message = message;
    });
}

  loadMealEvents(): void {
    this.mealEventService.getAllMealEvents().subscribe(mealEvents => {
      this.mealEvents = mealEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  isEventToday(eventDate: Date | string): boolean {
    const today = new Date();
    const event = eventDate instanceof Date ? eventDate : new Date(eventDate);
    return today.toDateString() === event.toDateString();
  }

  navigateToCreateMealEvent() {
    this.router.navigate(['/meal-events/create-meal-event']);
  }

  selectMealEvent(eventId: string | undefined): void {
    if (eventId) {
      this.selectedMealEventId = eventId;
      this.mealEventService.selectMealEvent(eventId).subscribe({
        next: (response) => {
          console.log('Meal event selected successfully', response);
          sessionStorage.setItem('selectedMealEventId', eventId);
        },
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
        sessionStorage.removeItem('selectedMealEventId');
      },
      error: (error) => console.error('Неуспешно деселектиране на mealEvent', error)
    });
  }

  deleteMealEvent(mealEventId: string): void {
    const confirmation = window.confirm('Are you sure you want to delete this meal event?');
    
    if (confirmation) {
      this.mealEventService.deleteMealEvent(mealEventId).subscribe({
        next: (response) => {
          console.log('Meal event deleted successfully', response);
          this.mealEvents = this.mealEvents.filter(event => event._id !== mealEventId);
        },
        error: (error) => console.error('Неуспешно изтриване на mealEvent', error)
      });
    } else {
      console.log('Meal event deletion cancelled by the user.');
    }
  }

}
