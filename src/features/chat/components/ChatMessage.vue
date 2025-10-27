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
        <p class="flex-1 font-inter font-md font-normal leading-normal tracking-[0.5px]">
          {{ message.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from '../types/chat.types';
import ChatAvatar from './ChatAvatar.vue';

interface Props {
  message: Message;
}

const props = defineProps<Props>();

const messageClasses = computed(() => {
  if (props.message.role === 'assistant') {
    return 'bg-gray-0 text-[#0D082C] max-w-[600px]';
  }
  return 'bg-teal-700 text-white max-w-[600px]';
});
</script>
