export interface ChatMessage {
    message: string;
  }
  
  export interface ChatResponse {
    answer: string;
  }
  
  export interface Intent {
    _id: string;
    tag: string;
    patterns: string[];
    responses: string[];
  }

  export interface Message {
    text: string;
    sender: 'user' | 'bot';
    time: string;
    status: 'Sent' | 'Delivered' | 'Failed';
  }