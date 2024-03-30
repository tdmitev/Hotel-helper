import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  register(email: string, username: string, role: string, password: string, repeatPassword: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { 
      email, 
      username, 
      role, 
      password, 
      repeatPassword
    }, { withCredentials: true }) 
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'An error occurred';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          console.error(errorMsg);
          return throwError(() => new Error(errorMsg));
        })
      );
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
    this.http.post(`${this.apiUrl}/logout`, { withCredentials: true }).subscribe({
      next: () => {
        localStorage.removeItem('authToken');
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
