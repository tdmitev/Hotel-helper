import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';
  private apiUrl = 'http://localhost:3001/api';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  register(email: string, username: string, password: string, repeatPassword: string, role: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { 
      email, 
      username, 
      password, 
      repeatPassword, 
      role 
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable((observer) => {
      this.http.post<User>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).subscribe({
        next: (user) => {
          this.user = user;
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          observer.next(user);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.user = undefined;
        localStorage.removeItem(this.USER_KEY);
        console.log("Logout successful");
      },
      error: (err) => {
        console.error("Logout failed:", err);
      }
    });
  }

}
