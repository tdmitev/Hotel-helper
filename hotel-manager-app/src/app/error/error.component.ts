import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AppError } from '../types/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errorMessage: string = '';
  
  error: AppError | null = null;
  private errorSubscription?: Subscription;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorSubscription = this.errorService.error$.subscribe(
      (error: AppError) => {
        this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
}