import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MenuItem } from '../types/menuItems';

@Injectable({
  providedIn: 'root'
})
export class MealItemService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDishes(mealEventId: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/meal-events/${mealEventId}/menu-items`);
  }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu-items`);
  }

  createMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(`${this.apiUrl}/menu-items/create-menu-item`, menuItem);
  }

}
