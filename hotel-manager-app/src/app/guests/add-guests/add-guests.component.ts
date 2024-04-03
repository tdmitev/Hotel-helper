import { Component, OnInit } from '@angular/core';
import { slideFade } from 'src/app/animations/animations';
import { GuestService } from 'src/app/services/guest.service';
import { MessageService } from 'src/app/services/message.service';
import { Guest } from 'src/app/types/guest';
import { MealEvent } from 'src/app/types/meal-event';
import { MealEventService } from 'src/app/services/meal-event.service';

@Component({
  selector: 'app-add-guests',
  templateUrl: './add-guests.component.html',
  styleUrls: ['./add-guests.component.css'],
  animations: [slideFade]
})
export class AddGuestsComponent implements OnInit {
  guests: Guest[] = [];
  mealEvent: MealEvent | undefined;

  constructor(private guestService: GuestService, private messageService: MessageService, private mealEventService: MealEventService) { }

  ngOnInit(): void {
    this.loadGuests();
    this.loadMealEvent();
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe({
      next: (guests) => this.guests = guests,
      error: (error) => console.error('Failed to load guests:', error)
    });
  }

  loadMealEvent(): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
    console.log('mealEventId:', mealEventId);
    if (mealEventId) {
      this.mealEventService.getMealEventByIdInfo(mealEventId).subscribe({
        next: (mealEvent) => this.mealEvent = mealEvent,
        error: (error) => console.error('Failed to load meal event:', error)
      });
    }
  }

  isGuestAttended(guestId: string | undefined): boolean {
    if (!guestId) {
      return false;
    }
    return this.mealEvent?.guests?.some(g => g.guestId === guestId && g.attended) ?? false;
  }

  checkInGuest(guestId: string): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
  
    if (!mealEventId) {
      console.error('Meal event ID is not set');
      return;
    }
  
    this.guestService.checkInGuest(guestId, mealEventId).subscribe({
      next: () => {     
        this.messageService.setMessage('Guest checked in successfully!');
      }, 
      error: (error) => {
        this.messageService.setMessage('Guest already checked in!', "error");
        console.error('Check-in failed:', error)
      }
    });
  }


}