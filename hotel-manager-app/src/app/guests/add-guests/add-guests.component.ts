import { Component, OnInit } from '@angular/core';
import { slideFade } from 'src/app/animations/animations';
import { GuestService } from 'src/app/services/guest.service';
import { MessageService } from 'src/app/services/message.service';
import { Guest } from 'src/app/types/guest';
import { MealEvent } from 'src/app/types/meal-event';

@Component({
  selector: 'app-add-guests',
  templateUrl: './add-guests.component.html',
  styleUrls: ['./add-guests.component.css'],
  animations: [slideFade]
})
export class AddGuestsComponent implements OnInit {
  guests: Guest[] = [];
  

  constructor(private guestService: GuestService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe({
      next: (guests) => this.guests = guests,
      error: (error) => console.error('Failed to load guests:', error)
    });
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