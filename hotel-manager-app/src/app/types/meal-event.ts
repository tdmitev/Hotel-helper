export interface MealEvent {
    _id?: string;
    date: Date;
    mealType: 'breakfast' | 'lunch' | 'dinner';
    guests: Array<{
      guestId: string; 
      attended: boolean;
    }>;
    menuItems: string[]; 
    totalGuests?: number;
    attendedGuests?: number;
    createdAt?: Date; 
  }