import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppError } from '../types/error';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<AppError>();
  public error$ = this.errorSubject.asObservable();

  public handleError(error: AppError) {
    this.errorSubject.next(error);
  }
}