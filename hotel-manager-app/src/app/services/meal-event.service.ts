import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealEvent } from '../types/meal-event'; 
import { environment } from 'src/environments/environment';
import { MenuItem } from '../types/menuItems';

@Injectable({
  providedIn: 'root'
})
export class MealEventService {
  private apiUrl = environment.apiUrl + '/meal-events';

  
  constructor(private http: HttpClient) {}

  getAllMealEvents(): Observable<MealEvent[]> {
    return this.http.get<MealEvent[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  getMealEventById(mealEventId: string): Observable<MealEvent> {
    return this.http.get<MealEvent>(`${this.apiUrl}/select/${mealEventId}`);
  }

  getMealEventByIdInfo(mealEventId: string): Observable<MealEvent> {
    return this.http.get<MealEvent>(`${this.apiUrl}/guests/${mealEventId}`);
  }

  addMenuItemToMealEvent(mealEventId: string, menuItemId: string): Observable<{ message: string }> { 
    return this.http.post<{ message: string }>(`${this.apiUrl}/menu-items/add-menu-item`, { mealEventId, menuItemId });
  }

  removeMenuItemFromMealEvent(menuItemId: string): Observable<{ message: string }> { 
    return this.http.delete<{ message: string }>(`${this.apiUrl}/menu-items/${menuItemId}`);
  }

  getSelectedMenuItemsForMealEvent(mealEventId: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu-items?mealEventId=${mealEventId}`);
  }



  createMealEvent(mealEvent: MealEvent): Observable<MealEvent> {
    return this.http.post<MealEvent>(`${this.apiUrl}/create-meal-event`, mealEvent);
  }

  selectMealEvent(mealEventId: string): Observable<MealEvent> {
    return this.http.post<MealEvent>(`${this.apiUrl}/select/${mealEventId}`, { withCredentials: true });
  }

  deselectMealEvent(): Observable<any> { 
    return this.http.post(`${this.apiUrl}/deselect`, {});
  }

  deleteMealEvent(mealEventId: string): Observable<MealEvent> {
    return this.http.delete<MealEvent>(`${this.apiUrl}/${mealEventId}`);
  }
}