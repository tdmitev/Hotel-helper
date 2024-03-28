import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private message = new BehaviorSubject<string | null>(null);

  setMessage(message: string) {
    this.message.next(message);
    setTimeout(() => this.message.next(null), 4000); 
  }

  getMessage(): Observable<string | null> {
    return this.message.asObservable();
  }
}