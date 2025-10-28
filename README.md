# Nitra AI Chat

An intelligent AI-powered chat widget built with Vue 3, Quasar Framework, and TypeScript. This application provides an interactive conversational interface with advanced features including markdown rendering, typing animations, and contextual suggestions.

## Features

### 🎯 Core Functionality

- **Interactive Chat Interface**: Clean, modern chat widget with expandable/collapsible window
- **AI-Powered Responses**: Mock AI assistant that provides contextual responses based on product queries
- **Markdown Support**: Full markdown rendering for formatted responses including links, lists, and emphasis
- **Typing Animation**: Realistic character-by-character typing effect for AI responses
- **Dynamic Suggestions**: Contextual follow-up questions that appear after AI responses
- **Auto-scroll**: Automatic scrolling to keep the latest messages visible
- **Loading States**: Visual indicators during message processing

### 🎨 User Experience

- **Rotating Welcome Suggestions**: Animated suggestion cards that rotate through common queries
- **FontAwesome Icons**: Beautiful icons throughout the interface
- **Smooth Transitions**: Quasar-powered animations for suggestions and UI elements
- **Responsive Design**: Tailwind CSS for mobile-friendly, responsive layout
- **Disabled State Management**: Input disabled during message loading and typing animations

## Technology Stack

### Frontend Framework
- **Vue 3** (v3.5.22) - Progressive JavaScript framework with Composition API
- **TypeScript** (v5.9.2) - Type-safe development
- **Quasar Framework** (v2.16.0) - Vue-based UI framework
- **Tailwind CSS** (v4.1.16) - Utility-first CSS framework

### State Management & Routing
- **Pinia** (v3.0.1) - Vue state management library
- **Vue Router** (v4.0.12) - Official router for Vue.js

### Content Rendering
- **Marked** (v16.4.1) - Markdown parser and compiler
- **DOMPurify** (v3.3.0) - XSS sanitizer for HTML content

### Icons & Assets
- **@quasar/extras** (v1.16.4) - FontAwesome and other icon sets

### Development Tools
- **Vite** - Lightning-fast build tool
- **ESLint** (v9.14.0) - Code linting
- **Prettier** (v3.3.3) - Code formatting
- **pnpm** - Fast, disk space efficient package manager

## Project Architecture

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   └── ChatWidget.vue   # Main chat widget component
├── features/            # Feature-based organization
│   └── chat/           # Chat feature module
│       ├── components/ # Chat-specific components
│       │   ├── ChatAvatar.vue       # User/AI avatar display
│       │   ├── ChatHeader.vue       # Chat window header
│       │   ├── ChatInput.vue        # Message input field
│       │   ├── ChatLoading.vue      # Loading indicator
│       │   ├── ChatMessage.vue      # Message bubble component
│       │   ├── ChatSuggestion.vue   # Rotating suggestions
│       │   └── TypingText.vue       # Typing animation wrapper
│       ├── composables/ # Reusable logic
│       │   ├── useMarkdown.ts       # Markdown parsing
│       │   └── useTypingAnimation.ts # Typing effect logic
│       ├── stores/      # State management
│       │   └── useChatStore.ts      # Chat state & actions
│       ├── types/       # TypeScript definitions
│       │   └── chat.types.ts        # Chat-related types
│       └── index.ts     # Feature exports
├── mock/               # Mock data
│   └── messages.js     # Predefined AI responses
├── css/                # Global styles
│   ├── app.scss        # Custom styles and utilities
│   └── quasar.variables.scss # Quasar theme variables
└── App.vue             # Root component
```

### Key Components

#### ChatWidget.vue
The main container component that orchestrates the chat interface:
- Manages chat window open/close state
- Handles message sending and input focus
- Implements auto-scroll functionality
- Coordinates typing animations and loading states
- Positions floating help button

#### ChatMessage.vue
Renders individual message bubbles:
- Differentiates user vs. assistant messages with styling
- Integrates markdown rendering for AI responses
- Displays typing animation for new messages
- Shows contextual suggestions after content completion
- Emits events for typing state changes

#### TypingText.vue
Reusable component for typing animation:
- Character-by-character text reveal
- Configurable typing speed and delay
- Emits events for animation lifecycle
- Supports custom rendering via scoped slots

#### ChatSuggestion.vue
Displays rotating suggestion cards:
- Smooth transition effects using Quasar animations
- FontAwesome icons for visual interest
- Auto-rotation through predefined suggestions
- Only visible for new chat sessions

#### ChatInput.vue
Message input field component:
- Auto-expanding textarea
- Send button with loading state
- Keyboard shortcuts (Enter to send)
- Disabled during message processing

### State Management (Pinia)

The `useChatStore` manages all chat state:

**State:**
- `messages`: Array of chat messages
- `isLoading`: Loading state during API calls

**Getters:**
- `hasMessages`: Check if conversation has started
- `lastMessage`: Get most recent message

**Actions:**
- `initializeChat()`: Add welcome message
- `sendMessage()`: Process user input and generate response
- `addMessage()`: Add message to conversation
- `clearMessages()`: Reset conversation
- `getMockResponse()`: Retrieve predefined responses
- `extractSuggestionsFromContent()`: Parse suggestions from AI responses

### Composables

#### useTypingAnimation
Implements character-by-character typing effect:
- Configurable typing speed
- Start delay option
- Lifecycle callbacks (onStart, onUpdate)
- Reactive state (displayedContent, isTyping, isComplete)

#### useMarkdown
Handles markdown parsing and sanitization:
- Uses `marked` for markdown to HTML conversion
- DOMPurify for XSS protection
- Configures markdown rendering options

### Type System

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestion?: string;  // Optional follow-up question
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  suggestions: string[];
}
```

## Mock Data System

The application uses predefined responses stored in `src/mock/messages.js`:

- Maps user queries to AI responses
- Includes product information, pricing, and links
- Contains embedded suggestions for follow-up questions
- Simulates realistic network delays (500-1500ms)

Example structure:
```javascript
{
  'User question': {
    message: {
      role: 'assistant',
      content: 'AI response with **markdown** support\n\nSuggested Question: Follow-up query',
      timestamp: '2025-09-17T06:24:15.453Z'
    }
  }
}
```

## Styling System

### Design Tokens
- Custom Quasar variables in `quasar.variables.scss`
- Utility classes in `app.scss`
- Tailwind CSS for layout and spacing

### Custom Shadows
```scss
.shadow-chat {
  box-shadow: 0 30px 60px 0 rgba(38, 77, 79, 0.25);
}

.shadow-button {
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
```

### Animation System
- Quasar's built-in transition effects
- Custom Vue `<Transition>` components
- CSS transitions for smooth interactions

## Development

### Prerequisites
- Node.js (v20, v22, v24, v26, or v28)
- pnpm (recommended package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development Commands

```bash
# Start development server (hot-reload)
pnpm dev

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Run tests
pnpm test
```

### Development Workflow

1. **Feature Development**: Organize new features in `src/features/[feature-name]/`
2. **Component Creation**: Use Vue 3 Composition API with `<script setup lang="ts">`
3. **State Management**: Create Pinia stores for complex state
4. **Styling**: Leverage Quasar components and Tailwind utilities
5. **Type Safety**: Define TypeScript interfaces for all data structures

## Future Enhancements

### Planned Features
- [ ] Real API integration (replacing mock data)
- [ ] User authentication and session persistence
- [ ] Message history with local storage
- [ ] File upload support
- [ ] Voice input capability
- [ ] Multi-language support
- [ ] Theme customization
- [ ] Search functionality in chat history
- [ ] Export conversation feature

### Technical Improvements
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Performance optimization
- [ ] Accessibility enhancements (WCAG compliance)
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode

## Configuration

### Quasar Configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)

### Environment Variables
Currently, the application uses mock data and doesn't require environment variables. For future API integration:

```bash
# .env.local
VITE_API_BASE_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
```

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Quasar Framework](https://quasar.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Marked Documentation](https://marked.js.org/)

## License

Private - Nitra AI Chat

## Contributing

This is a private project. For questions or contributions, please contact the maintainer.

---

**Built with ❤️ using Vue 3, Quasar, and TypeScript**
