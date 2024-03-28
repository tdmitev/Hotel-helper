import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealEvent } from '../types/meal-event'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealEventService {
  private apiUrl = environment.apiUrl + '/meal-events';

  
  constructor(private http: HttpClient) {}

  getAllMealEvents(): Observable<MealEvent[]> {
    return this.http.get<MealEvent[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  selectMealEvent(mealEventId: string): Observable<MealEvent> {
    return this.http.post<MealEvent>(`${this.apiUrl}/select/${mealEventId}`, { withCredentials: true });
  }

  deselectMealEvent(): Observable<any> { 
    return this.http.post(`${this.apiUrl}/deselect`, {});
  }
}