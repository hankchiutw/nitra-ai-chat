# AGENTS.md

## Project Overview

**Nitra AI Chat** is a Vue 3 application built with the Quasar Framework, utilizing TypeScript, Composition API, and Pinia for state management. The project uses pnpm as the package manager and follows a feature-based architecture.

## Technology Stack

- **Framework**: Vue 3 (v3.5.22) with Composition API
- **UI Framework**: Quasar (v2.16.0)
- **State Management**: Pinia (v3.0.1)
- **Router**: Vue Router (v4.0.12)
- **Build Tool**: Vite (via @quasar/app-vite)
- **Language**: TypeScript (v5.9.2)
- **Package Manager**: pnpm
- **Linting**: ESLint (v9.14.0) + Prettier (v3.3.3)

## Project Structure

```
src/
├── App.vue                 # Root application component
├── assets/                 # Static assets (images, fonts, etc.)
├── boot/                   # Boot files (run before app initialization)
├── components/             # Reusable Vue components
│   ├── EssentialLink.vue
│   ├── ExampleComponent.vue
│   └── models.ts
├── css/                    # Global styles
├── layouts/                # Layout components
│   └── MainLayout.vue
├── pages/                  # Page components (route views)
│   ├── IndexPage.vue
│   └── ErrorNotFound.vue
├── router/                 # Vue Router configuration
│   ├── index.ts
│   └── routes.ts
├── stores/                 # Pinia stores
│   ├── index.ts
│   └── example-store.ts
└── env.d.ts               # TypeScript environment declarations
```

## Architecture Principles

### 1. Feature-Based Organization

When implementing new features, organize code by feature rather than by type. Create feature directories that contain all related components, stores, composables, and utilities.

**Example structure for a chat feature:**

```
src/
└── features/
    └── chat/
        ├── components/
        │   ├── ChatMessage.vue
        │   ├── ChatInput.vue
        │   └── ChatList.vue
        ├── stores/
        │   └── useChatStore.ts
        ├── composables/
        │   └── useChat.ts
        ├── types/
        │   └── chat.types.ts
        └── utils/
            └── chatHelpers.ts
```

### 2. Composition API

All components should use the Vue 3 Composition API with `<script setup>` syntax:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>
```

### 3. Pinia State Management

Use Pinia for global state management. Each store should be self-contained and feature-specific.

**Store conventions:**

- Use `defineStore` with the Composition API style or Options API style
- Enable HMR (Hot Module Replacement) for development
- Keep stores focused on a single feature or domain
- Use TypeScript for type safety

**Example store (Composition API style - recommended):**

```typescript
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';

export const useFeatureStore = defineStore('feature', () => {
  // State (using ref)
  const data = ref<DataType[]>([]);

  // Getters (using computed)
  const filteredData = computed(() => {
    return data.value.filter(/* ... */);
  });

  // Actions (using functions)
  function addData(item: DataType) {
    data.value.push(item);
  }

  return {
    data,
    filteredData,
    addData,
  };
});

// Enable HMR for development
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFeatureStore, import.meta.hot));
}
```

**Example store (Options API style):**

```typescript
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useFeatureStore = defineStore('feature', {
  state: () => ({
    data: [] as DataType[],
  }),

  getters: {
    filteredData: (state) => {
      return state.data.filter(/* ... */);
    },
  },

  actions: {
    addData(item: DataType) {
      this.data.push(item);
    },
  },
});

// Enable HMR for development
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFeatureStore, import.meta.hot));
}
```

### 4. Component Structure

Components should follow this structure:

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 2. Props & Emits
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});

const emit = defineEmits<{
  update: [value: number];
  close: [];
}>();

// 3. Composables & Stores
const router = useRouter();

// 4. Local state
const localValue = ref(0);

// 5. Computed properties
const displayValue = computed(() => props.count + localValue.value);

// 6. Methods
function handleUpdate() {
  emit('update', localValue.value);
}

// 7. Lifecycle hooks
onMounted(() => {
  // Initialization
});
</script>

<template>
  <div class="component">
    <!-- Template content -->
  </div>
</template>

<style scoped lang="scss">
.component {
  /* Styles */
}
</style>
```

### 5. Routing

Routes are defined in `src/router/routes.ts`. Use lazy loading for all page components:

```typescript
{
  path: '/feature',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('pages/FeaturePage.vue'),
    },
  ],
}
```

## Development Guidelines

### Package Management

**Always use pnpm for package operations:**

```bash
# Install dependencies
pnpm install

# Add a dependency
pnpm add package-name

# Add a dev dependency
pnpm add -D package-name

# Update dependencies
pnpm update
```

### Development Workflow

```bash
# Start development server with hot-reload
pnpm dev

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build
```

### Code Style

- **TypeScript**: Use TypeScript for all new files
- **Strict typing**: Define interfaces and types for props, emits, and data structures
- **Naming conventions**:
  - Components: PascalCase (e.g., `ChatMessage.vue`)
  - Composables: camelCase with `use` prefix (e.g., `useChat.ts`)
  - Stores: camelCase with `use` prefix and `Store` suffix (e.g., `useChatStore.ts`)
  - Files: kebab-case or PascalCase for components
- **Auto-formatting**: Run `pnpm format` before committing

### Quasar Components

Leverage Quasar's component library for UI elements. Quasar components are auto-imported, so you don't need explicit imports:

```vue
<script setup lang="ts">
// Quasar components are auto-imported - no need to import them
const text = ref('');

function handleSubmit() {
  // Handle submission
}
</script>

<template>
  <q-card>
    <q-input v-model="text" label="Enter text" />
    <q-btn label="Submit" @click="handleSubmit" />
  </q-card>
</template>
```

To access Quasar utilities like `$q`, use the `useQuasar` composable:

```vue
<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

function showNotification() {
  $q.notify({
    message: 'Hello World!',
    color: 'primary',
  });
}
</script>
```

### Composables

Extract reusable logic into composables (place in feature-specific directories or `src/composables/`):

```typescript
// composables/useFeature.ts
import { ref, computed } from 'vue';

export function useFeature() {
  const state = ref(initialState);

  const derivedValue = computed(() => {
    return transform(state.value);
  });

  function updateState(newValue: StateType) {
    state.value = newValue;
  }

  return {
    state,
    derivedValue,
    updateState,
  };
}
```

## Common Patterns

### 1. API Calls

Create API service modules for external data fetching:

```typescript
// features/chat/api/chatApi.ts
export const chatApi = {
  async fetchMessages() {
    const response = await fetch('/api/messages');
    return response.json();
  },

  async sendMessage(message: string) {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },
};
```

### 2. Form Handling

Use Quasar's form validation with reactive state (Quasar components are auto-imported):

```vue
<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
});

function onSubmit() {
  // Handle form submission
}
</script>

<template>
  <q-form @submit="onSubmit">
    <q-input v-model="formData.name" label="Name" :rules="[(val) => !!val || 'Name is required']" />
    <q-input
      v-model="formData.email"
      label="Email"
      type="email"
      :rules="[(val) => !!val || 'Email is required']"
    />
    <q-btn type="submit" label="Submit" />
  </q-form>
</template>
```

### 3. Loading and Error States

Manage async operations with consistent patterns:

```vue
<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
const error = ref<string | null>(null);
const data = ref<DataType | null>(null);

async function fetchData() {
  loading.value = true;
  error.value = null;

  try {
    data.value = await apiCall();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <q-spinner v-if="loading" />
    <q-banner v-else-if="error" class="text-negative">
      {{ error }}
    </q-banner>
    <div v-else-if="data">
      <!-- Display data -->
    </div>
  </div>
</template>
```

## Testing

Currently, no test framework is configured. When adding tests:

1. Consider using Vitest for unit tests
2. Use @vue/test-utils for component testing
3. Organize tests in `__tests__` directories next to the code they test
4. Follow the naming convention: `*.spec.ts` or `*.test.ts`

## Best Practices

1. **Single Responsibility**: Keep components, stores, and composables focused on a single concern
2. **Type Safety**: Always define TypeScript types for props, emits, and complex data structures
3. **Immutability**: Prefer immutable data operations where possible
4. **Reactivity**: Be mindful of Vue's reactivity system; use `ref()` and `reactive()` appropriately
5. **Performance**: Use `computed()` for derived state, `watch()` for side effects
6. **Code Reusability**: Extract common logic into composables
7. **Feature Isolation**: Keep features self-contained with minimal cross-dependencies
8. **Lazy Loading**: Use lazy loading for routes and heavy components
9. **Error Handling**: Implement proper error handling and user feedback
10. **Accessibility**: Use semantic HTML and ARIA attributes where needed

## AI Agent Instructions

When working on this project:

1. **Always use pnpm** for package management operations
2. **Use Composition API** with `<script setup lang="ts">` for all Vue components
3. **Organize by feature** when adding new functionality
4. **Use Pinia stores** for global state, with HMR support
5. **Type everything** with TypeScript interfaces and types
6. **Follow Quasar conventions** and use Quasar components
7. **Run linter and formatter** before finalizing changes
8. **Keep components small** and focused on a single responsibility
9. **Extract reusable logic** into composables
10. **Use lazy loading** for routes and heavy components

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Quasar Framework](https://quasar.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vue Router Documentation](https://router.vuejs.org/)
