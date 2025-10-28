import { acceptHMRUpdate, defineStore } from 'pinia';
import { MESSAGE_MOCK_MAP } from 'src/mock/messages';
import { computed, ref } from 'vue';
import type { Message } from '../types/chat.types';

export const useChatStore = defineStore('chat', () => {
  // State
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);

  // Getters
  const hasMessages = computed(() => messages.value.length > 0);
  const lastMessage = computed(() => messages.value[messages.value.length - 1]);

  // Actions
  function addMessage(message: Message) {
    messages.value.push(message);
  }

  function generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  function extractSuggestionsFromContent(content: string): {
    cleanContent: string;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let cleanContent = content;

    // Extract "Suggested Question:" or "Suggestion Question:" from content
    const suggestionMatch = content.match(/Suggest(?:ed|ion) Question:(.+?)(?:\n|$)/i);
    if (suggestionMatch && suggestionMatch[1]) {
      const suggestion = suggestionMatch[1].trim();
      if (suggestion && suggestion.length > 0) {
        suggestions.push(suggestion);
        // Remove the suggestion line from content
        cleanContent = content.replace(/\n*Suggest(?:ed|ion) Question:.+?(?:\n|$)/i, '').trim();
      }
    }

    return { cleanContent, suggestions };
  }

  function getMockResponse(userMessage: string): Message {
    // Check for exact match in MESSAGE_MOCK_MAP
    const mockData = MESSAGE_MOCK_MAP[userMessage as keyof typeof MESSAGE_MOCK_MAP];

    if (mockData) {
      const { message } = mockData;

      // Extract suggestions from content and get clean content
      const { cleanContent, suggestions: extractedSuggestions } = extractSuggestionsFromContent(
        message.content,
      );

      return {
        id: generateMessageId(),
        role: message.role as 'assistant',
        content: cleanContent,
        timestamp: new Date().toISOString(),
        suggestion: extractedSuggestions[0] || '',
      };
    }

    // Fallback response for unmatched messages
    return {
      id: generateMessageId(),
      role: 'assistant',
      content:
        'I understand your question. For now, I can help with specific queries about products. Try asking one of the suggested questions below!',
      timestamp: new Date().toISOString(),
    };
  }

  async function simulateDelay(): Promise<void> {
    // Simulate network delay (500-1500ms)
    const delay = 500 + Math.random() * 5000;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  async function sendMessage(content: string): Promise<void> {
    if (!content.trim()) {
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);

    // Set loading state
    isLoading.value = true;

    try {
      // Simulate API delay
      await simulateDelay();

      // Get mock response
      const assistantMessage = getMockResponse(content.trim());
      addMessage(assistantMessage);
    } finally {
      isLoading.value = false;
    }
  }

  function clearMessages(): void {
    messages.value = [];
    isLoading.value = false;
  }

  function initializeChat(): void {
    // Add welcome message
    const welcomeMessage: Message = {
      id: generateMessageId(),
      role: 'assistant',
      content: 'Welcome to Nitra AI!',
      timestamp: new Date().toISOString(),
    };
    addMessage(welcomeMessage);
  }

  return {
    // State
    messages,
    isLoading,

    // Getters
    hasMessages,
    lastMessage,

    // Actions
    addMessage,
    sendMessage,
    clearMessages,
    initializeChat,
  };
});

// Enable HMR for development
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
}
