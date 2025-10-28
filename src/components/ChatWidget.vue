<template>
  <div class="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-end gap-3 z-50">
    <!-- Chat Window -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="flex flex-col w-[90vw] max-w-[780px] bg-white rounded-lg shadow-chat"
      >
        <!-- Header -->
        <ChatHeader @close="isOpen = false" />

        <!-- Body -->
        <div
          ref="messagesContainer"
          class="flex min-h-[420px] max-h-[900px] h-[60vh] px-5 pt-8 pb-5 flex-col justify-between items-start bg-white overflow-y-auto"
        >
          <!-- Chat Messages -->
          <div class="flex flex-col gap-5 w-full">
            <ChatMessage
              v-for="message in chatStore.messages"
              :key="message.id"
              :message="message"
              :enable-typing="true"
              @content-update="handleContentUpdate"
              @typing-start="handleTypingStart"
              @typing-complete="handleTypingComplete"
            />

            <!-- Loading Indicator -->
            <ChatLoading v-if="chatStore.isLoading" />
          </div>
          <!-- Suggestions -->
          <ChatSuggestion v-if="chatStore.messages.length <= 1" />
        </div>

        <!-- Input Area -->
        <ChatInput
          ref="chatInputRef"
          v-model="messageInput"
          :disabled="isInputDisabled"
          @send="handleSendMessage"
        />
      </div>
    </Transition>

    <!-- Help Button -->
    <button
      @click="toggleChat"
      class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-500 shadow-button hover:opacity-90 transition-opacity"
    >
      <q-icon name="fas fa-wand-magic-sparkles" size="12px" class="text-white" />
      <span class="text-white text-center font-sm font-semibold"> Ask Nitra AI </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch, computed } from 'vue';
import { useChatStore } from 'src/features/chat';
import ChatHeader from 'src/features/chat/components/ChatHeader.vue';
import ChatMessage from 'src/features/chat/components/ChatMessage.vue';
import ChatSuggestion from 'src/features/chat/components/ChatSuggestion.vue';
import ChatInput from 'src/features/chat/components/ChatInput.vue';
import ChatLoading from 'src/features/chat/components/ChatLoading.vue';

const chatStore = useChatStore();
const isOpen = ref(true);
const messageInput = ref('');
const messagesContainer = ref<HTMLDivElement | null>(null);
const chatInputRef = ref<InstanceType<typeof ChatInput> | null>(null);
const isTyping = ref(false);

const isInputDisabled = computed(() => chatStore.isLoading || isTyping.value);

onMounted(() => {
  chatStore.initializeChat();
});

function toggleChat() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    scrollToBottom();
    chatInputRef.value?.focus();
  }
}

async function handleSendMessage(message: string) {
  await chatStore.sendMessage(message);
  scrollToBottom();
}

function handleContentUpdate() {
  // Called during typing animation to keep scrolled to bottom
  scrollToBottom();
}

function handleTypingStart() {
  isTyping.value = true;
}

function handleTypingComplete() {
  isTyping.value = false;
}

function scrollToBottom() {
  if (messagesContainer.value) {
    void nextTick(() => {
      // Scroll to bottom smoothly
      messagesContainer.value?.scrollTo({
        top: messagesContainer.value.scrollHeight,
      });
    });
  }
}

// Watch for new messages and auto-scroll
watch(
  () => chatStore.messages.length,
  () => {
    scrollToBottom();
  },
);

// Watch for loading state changes to scroll when response arrives
watch(
  () => chatStore.isLoading,
  (newValue) => {
    if (!newValue) {
      // When loading finishes, scroll to bottom smoothly
      scrollToBottom();
    }
  },
);
</script>

<style scoped lang="scss">
.shadow-chat {
  box-shadow: 0 30px 60px 0 rgba(38, 77, 79, 0.25);
}

.shadow-button {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
</style>
