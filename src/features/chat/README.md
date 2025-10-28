# Chat Feature

This directory contains the chat feature implementation for Nitra AI.

## Structure

```
src/features/chat/
├── index.ts                    # Feature exports
├── types/
│   └── chat.types.ts          # TypeScript type definitions
├── stores/
│   └── useChatStore.ts        # Pinia store for chat state
├── composables/               # Reusable logic (to be added)
└── components/                # Chat UI components (to be added)
```

## Store: `useChatStore`

The chat store manages all chat state and actions.

### State

- `messages: Message[]` - Array of chat messages (user and assistant)
- `isLoading: boolean` - Loading state during mock API responses
- `suggestions: string[]` - Current suggestion items to display

### Getters

- `hasMessages` - Returns true if there are any messages
- `lastMessage` - Returns the most recent message

### Actions

- `initializeChat()` - Initializes chat with welcome message and default suggestions
- `sendMessage(content: string)` - Sends a user message and triggers mock response
- `addMessage(message: Message)` - Adds a message to the chat
- `clearMessages()` - Clears all messages and resets state

## Types

### `Message`

```typescript
{
  id: string; // Unique message ID
  role: 'user' | 'assistant';
  content: string; // Message content
  timestamp: string; // ISO timestamp
}
```

### `ChatState`

```typescript
{
  messages: Message[];
  isLoading: boolean;
  suggestions: string[];
}
```

## Usage

```typescript
import { useChatStore } from 'src/features/chat';

const chatStore = useChatStore();

// Initialize chat
chatStore.initializeChat();

// Send a message
await chatStore.sendMessage('Can you help me compare gloves?');

// Access messages
const messages = chatStore.messages;

// Check loading state
if (chatStore.isLoading) {
  // Show loading indicator
}
```

## Mock Response Logic

The store uses `MESSAGE_MOCK_MAP` from `src/mock/messages.js` to simulate responses:

1. User sends a message
2. Store adds user message to state
3. Store sets `isLoading = true`
4. Store simulates network delay (500-1500ms)
5. Store checks for exact match in `MESSAGE_MOCK_MAP`
6. If match found, uses that response
7. If no match, returns fallback response
8. Store extracts suggestions from response content
9. Store adds assistant message to state
10. Store sets `isLoading = false`

## Next Steps

1. Create UI components (ChatMessage, ChatInput, etc.)
2. Wire up ChatWidget to use the store
3. Implement markdown rendering for assistant messages
4. Add message animations and transitions
5. Implement auto-scroll behavior
6. Add suggestion chip interactions
