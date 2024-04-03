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

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}`);
  }

  findGuestByName(name: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/statistics/checked-in-guests?name=${name}`);
  }

  getGuestsByRoom(roomNumber: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/statistics/checked-in-guests?roomNumber=${roomNumber}`);
  }

  checkInGuest(guestId: string, mealEventId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/room/check-in`, { guestId, mealEventId });
  }

  checkOutGuest(guestId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/statistics/checked-in-guests/${guestId}`, { guestId });
  }

}