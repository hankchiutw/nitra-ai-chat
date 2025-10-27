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
        class="flex px-4 py-2.5 items-start gap-2 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
        :class="messageClasses"
      >
        <!-- Render markdown for assistant messages, plain text for user -->
        <div
          v-if="message.role === 'assistant'"
          class="flex-1 font-inter font-md font-normal leading-normal tracking-[0.5px] markdown-content"
          v-html="renderedContent"
        ></div>
        <p v-else class="flex-1 font-inter font-md font-normal leading-normal tracking-[0.5px]">
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

interface Props {
  message: Message;
}

const props = defineProps<Props>();
const { parseMarkdown } = useMarkdown();

const messageClasses = computed(() => {
  if (props.message.role === 'assistant') {
    return 'bg-gray-0 text-[#0D082C] max-w-[600px]';
  }
  return 'bg-teal-700 text-white max-w-[600px]';
});

const renderedContent = computed(() => {
  if (props.message.role === 'assistant') {
    return parseMarkdown(props.message.content);
  }
  return props.message.content;
});
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
