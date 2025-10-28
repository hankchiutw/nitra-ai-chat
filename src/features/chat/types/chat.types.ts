export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestion?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  suggestions: string[];
}

export interface MockMessageResponse {
  role: 'assistant';
  content: string;
  timestamp: string;
}

export interface MockMessage {
  message: MockMessageResponse;
}
