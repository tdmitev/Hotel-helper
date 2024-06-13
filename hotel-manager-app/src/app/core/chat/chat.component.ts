import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatResponse, ChatMessage, Message } from '../../types/chat'; 
import { fadeInOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', './chat-settings.component.css'],
  animations: [fadeInOut] 
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  userMessage: string = '';
  messages: Message[] = [];
  chatActive = false;
  showSettingsIcon = false;
  settingsView = false;
  stars = Array(5).fill(0); 

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.chatActive = !this.chatActive;
  }

  toggleSettingsView(event: Event) {
    event.stopPropagation(); 
    this.settingsView = !this.settingsView;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      const userMsg: Message = {
        text: this.userMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
        status: 'Sent'
      };
      this.messages.push(userMsg);
      this.userMessage = '';

      const chatMsg: ChatMessage = { message: userMsg.text };

      this.chatService.sendMessage(chatMsg).subscribe({
        next: (response: ChatResponse) => {
          const botMsg: Message = {
            text: response.answer,
            sender: 'bot',
            time: new Date().toLocaleTimeString(),
            status: 'Delivered'
          };
          this.messages.push(botMsg);
        },
        error: (error) => {
          console.error('Error:', error);
          const errorMsg: Message = {
            text: 'Error: Could not get response from the server',
            sender: 'bot',
            time: new Date().toLocaleTimeString(),
            status: 'Failed'
          };
          this.messages.push(errorMsg);
        }
      });
    }
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }
}