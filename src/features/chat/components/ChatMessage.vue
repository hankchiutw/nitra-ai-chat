<template>
  <div class="flex items-start gap-2.5">
    <!-- Avatar (only for assistant) -->
    <ChatAvatar v-if="message.role === 'assistant'" />

    <!-- Message Content -->
    <div
      class="flex flex-col items-start gap-1.5"
      :class="{
        'ml-auto': message.role === 'user',
      }"
    >
      <div
        class="flex px-4 py-2.5 items-start gap-2 rounded-br-[10px] rounded-bl-[10px] max-w-[600px]"
        :class="{
          'bg-gray-0 text-[#0D082C] rounded-tr-[10px]': message.role === 'assistant',
          'bg-teal-100 text-black rounded-tl-[10px]': message.role === 'user',
        }"
        @click="handleClick"
      >
        <!-- Render markdown for assistant messages, plain text for user -->
        <div
          v-if="message.role === 'assistant'"
          class="flex-1 font-inter font-md font-normal leading-normal tracking-[0.5px] markdown-content"
          v-html="renderedContent"
        ></div>
        <p
          v-else-if="message.role === 'user'"
          class="flex-1 font-inter font-md font-normal leading-normal tracking-[0.5px]"
        >
          {{ message.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from 'src/features/chat/types/chat.types';
import ChatAvatar from 'src/features/chat/components/ChatAvatar.vue';
import { useMarkdown } from 'src/features/chat/composables/useMarkdown';
import { useTypingAnimation } from 'src/features/chat/composables/useTypingAnimation';

interface Props {
  message: Message;
  enableTyping?: boolean;
}

interface Emits {
  contentUpdate: [];
}

const props = withDefaults(defineProps<Props>(), {
  enableTyping: true,
});

const emit = defineEmits<Emits>();

const { parseMarkdown } = useMarkdown();

// Only enable typing animation for assistant messages
const shouldAnimate = computed(() => props.message.role === 'assistant' && props.enableTyping);

const { displayedContent, skipAnimation } = useTypingAnimation(props.message.content, {
  enabled: shouldAnimate.value,
  onUpdate: () => {
    // Emit event when content updates during typing
    emit('contentUpdate');
  },
});

const renderedContent = computed(() => {
  if (props.message.role === 'assistant') {
    return parseMarkdown(displayedContent.value);
  }
  return displayedContent.value;
});

// Click to skip animation
function handleClick() {
  if (shouldAnimate.value) {
    skipAnimation();
  }
}
</script>

<style scoped lang="scss">
// Markdown content styling
.markdown-content {
  :deep(p) {
    margin: 0 0 0.5em 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(strong) {
    font-weight: 600;
  }

  :deep(em) {
    font-style: italic;
  }

  :deep(a) {
    color: #3a7679;
    text-decoration: underline;

    &:hover {
      color: #2e5e60;
    }
  }

  :deep(ul),
  :deep(ol) {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }

  :deep(li) {
    margin: 0.25em 0;
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-weight: 600;
    margin: 0.5em 0 0.25em 0;
  }

  :deep(h1) {
    font-size: 1.5em;
  }

  :deep(h2) {
    font-size: 1.3em;
  }

  :deep(h3) {
    font-size: 1.1em;
  }

  :deep(code) {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.125em 0.25em;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  :deep(pre) {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.75em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 0.5em 0;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  :deep(blockquote) {
    border-left: 3px solid #3a7679;
    padding-left: 1em;
    margin: 0.5em 0;
    color: #5c6970;
  }
}
</style>
