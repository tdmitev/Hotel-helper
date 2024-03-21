import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MenuItem } from '../types/menuItems';

@Injectable({
  providedIn: 'root'
})
export class MealItemService {

  constructor(private http: HttpClient) { }

  getDishes(mealEventId: string): Observable<MenuItem[]> {
    const {apiUrl} = environment;
    return this.http.get<MenuItem[]>(`${apiUrl}/meal-events/${mealEventId}/menu-items`);
  }
}
