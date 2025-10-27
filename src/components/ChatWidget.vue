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
          class="flex h-[420px] px-5 pt-8 pb-5 flex-col justify-between items-start bg-white overflow-y-auto"
        >
          <!-- Chat Messages -->
          <div class="flex flex-col gap-5 w-full">
            <ChatMessage
              v-for="message in chatStore.messages"
              :key="message.id"
              :message="message"
            />

            <!-- Loading Indicator -->
            <ChatLoading v-if="chatStore.isLoading" />

            <!-- Suggestions -->
            <div v-if="chatStore.suggestions.length > 0" class="flex flex-col gap-2 w-full">
              <ChatSuggestion
                v-for="(suggestion, index) in chatStore.suggestions"
                :key="index"
                :text="suggestion"
                @click="handleSuggestionClick"
              />
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <ChatInput
          ref="chatInputRef"
          v-model="messageInput"
          :disabled="chatStore.isLoading"
          @send="handleSendMessage"
        />
      </div>
    </Transition>

    <!-- Help Button -->
    <button
      @click="toggleChat"
      class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-500 shadow-button hover:opacity-90 transition-opacity"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-white"
      >
        <path
          d="M9.667 1L6.333 4.333M13 4.333L11 6.333M9.667 1L11 6.333M9.667 1L4.333 2.333M13 4.333L7.667 5.667M13 4.333L14.333 9.667M11 6.333L7.667 5.667M11 6.333L12.333 11.667M4.333 2.333L6.333 4.333M4.333 2.333L1 3M7.667 5.667L6.333 4.333M14.333 9.667L12.333 11.667M14.333 9.667L15 15M12.333 11.667L9.667 11M6.333 4.333L7.667 9.667M1 3L3 4.667M1 3L1.667 8.333M3 4.667L7.667 9.667M3 4.667L4.333 10.333M7.667 9.667L9.667 11M1.667 8.333L4.333 10.333M1.667 8.333L3 13.667M4.333 10.333L5.667 15M9.667 11L5.667 15M9.667 11L15 15M5.667 15L3 13.667"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        class="text-white text-center font-inter font-sm font-semibold leading-5 tracking-[0.07px]"
      >
        Ask Nitra AI
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue';
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

onMounted(() => {
  chatStore.initializeChat();
});

function toggleChat() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    void nextTick(() => {
      scrollToBottom();
      chatInputRef.value?.focus();
    });
  }
}

async function handleSendMessage(message: string) {
  await chatStore.sendMessage(message);
  void nextTick(() => {
    scrollToBottom();
  });
}

function handleSuggestionClick(suggestion: string) {
  messageInput.value = suggestion;
  chatInputRef.value?.focus();
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// Watch for new messages and auto-scroll
watch(
  () => chatStore.messages.length,
  () => {
    void nextTick(() => {
      scrollToBottom();
    });
  }
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
