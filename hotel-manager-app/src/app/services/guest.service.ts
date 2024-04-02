import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guest } from '../types/guest'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = environment.apiUrl + '/guests';

  constructor(private http: HttpClient) {}

  getGuestsByRoom(roomNumber: string): Observable<Guest[]> {
    const params = new HttpParams().set('roomNumber', roomNumber);
    return this.http.get<Guest[]>(`${this.apiUrl}/room`, { params });
  }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}`);
  }

  checkInGuest(guestId: string, mealEventId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/room/check-in`, { guestId, mealEventId });
  }

}