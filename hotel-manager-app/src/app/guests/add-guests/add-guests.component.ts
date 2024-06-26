import { Component, OnInit } from '@angular/core';
import { slideFade } from 'src/app/animations/animations';
import { GuestService } from 'src/app/services/guest.service';
import { MessageService } from 'src/app/services/message.service';
import { Guest } from 'src/app/types/guest';
import { MealEvent } from 'src/app/types/meal-event';
import { MealEventService } from 'src/app/services/meal-event.service';
import { Statistics } from 'src/app/types/statistics';

@Component({
  selector: 'app-add-guests',
  templateUrl: './add-guests.component.html',
  styleUrls: ['./add-guests.component.css'],
  animations: [slideFade]
})
export class AddGuestsComponent implements OnInit {
  guests: Guest[] = [];
  mealEvent: MealEvent | undefined;
  searchInput: string = '';
  statistics: Statistics | null = null; 

  constructor(private guestService: GuestService, private messageService: MessageService, private mealEventService: MealEventService) { }

  ngOnInit(): void {
    this.loadGuests();
    this.loadMealEvent();
    this.loadGuestStatistics();
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe({
      next: (guests) => {
        console.log('Guests loaded:', guests); 
        this.guests = guests;
      },
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

  loadGuestStatistics() {
    this.guestService.getGuestStatistics().subscribe({
      next: (statistics) => {
        this.statistics = statistics;
      },
      error: (error) => {
        console.error("Error loading guest statistics", error);
      }
    });
  }


  checkInGuest(guestId: string): void {
    const mealEventId = sessionStorage.getItem('selectedMealEventId');
  
    if (!mealEventId) {
      console.error('Meal event ID is not set');
      return;
    }
  
    this.guestService.checkInGuest(guestId, mealEventId).subscribe({
      next: (data) => {     
        console.log('Check-in successful. Data:', data); 
        this.messageService.setMessage('Guest checked in successfully!');
        this.loadGuests();
        this.loadMealEvent();
        this.loadGuestStatistics();
      }, 
      error: (error) => {
        this.messageService.setMessage('Guest already checked in!', "error");
        console.error('Check-in failed:', error)
      }
    });
  }

  checkOutGuest(guestId: string): void {
    this.guestService.checkOutGuest(guestId).subscribe({
      next: (data) => {
        console.log('Check-out successful. Data:', data);
        this.messageService.setMessage('Guest checked out successfully!');
        this.loadGuests();
        this.loadMealEvent(); 
        this.loadGuestStatistics();
      },
      error: (error) => {
        console.error('Check-out failed:', error);
        this.messageService.setMessage('Guest already checked out!', "error");
      }
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
  
    if (!target || !target.value.trim()) {
      this.loadGuests();
      return; 
    }
  
    const searchValue = target.value.trim();
    
    if (isNaN(Number(searchValue))) {
      this.guestService.findGuestByName(searchValue).subscribe(guests => {
        this.guests = guests;
      });
    } else {
      this.guestService.getGuestsByRoom(searchValue).subscribe(guests => {
        this.guests = guests;
      });
    }
  }


}