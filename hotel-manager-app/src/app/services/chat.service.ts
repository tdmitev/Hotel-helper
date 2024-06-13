import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChatMessage, ChatResponse } from '../types/chat'; 

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.flaskApiUrl}/predict`;

  constructor(private http: HttpClient) {}

  sendMessage(message: ChatMessage): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, message, { withCredentials: true });
  }
}