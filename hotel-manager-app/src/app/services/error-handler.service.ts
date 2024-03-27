import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';
import { AppError } from '../types/error';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  
  constructor(private injector: Injector, private errorService: ErrorService) { }

  handleError(error: any) {
    let appError: AppError;
    
    if (error instanceof HttpErrorResponse) {
      appError = {
        errorCode: error.status,
        message: error.message,
        details: error.error?.details || ''
      };
    } else {
      appError = {
        errorCode: -1,
        message: error.message || 'Unknown client error',
      };
    }

    this.errorService.handleError(appError);
  }
}