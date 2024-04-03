import { Pipe, PipeTransform } from '@angular/core';
import { MealEvent } from 'src/app/types/meal-event'; 

@Pipe({
  name: 'guestAttended'
})
export class GuestAttendedPipe implements PipeTransform {
    transform(guestId: string | undefined, mealEvent?: MealEvent): boolean {
      if (!guestId) {
        return false;
      }
      return mealEvent?.guests?.some(g => g.guestId === guestId && g.attended) ?? false;
    }
  }