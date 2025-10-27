<template>
  <div class="flex items-start gap-2.5">
    <ChatAvatar />

    <!-- Message Content -->
    <div class="flex flex-col items-start gap-1.5">
      <div
        class="flex px-4 py-2.5 items-start gap-2 rounded-br-[10px] rounded-bl-[10px] max-w-[600px] bg-gray-0 text-[#0D082C] rounded-tr-[10px]"
      >
        <div
          class="flex-1 font-inter font-md font-normal leading-normal tracking-[0.5px] markdown-content"
        >
          <!-- animate a 3-dot loading indicator -->
          Thinking
          <span class="font-bold opacity-0 animate-[pulse_1.6s_ease-in-out_infinite_0ms]">.</span>
          <span class="font-bold opacity-0 animate-[pulse_1.6s_ease-in-out_infinite_200ms]">.</span>
          <span class="font-bold opacity-0 animate-[pulse_1.6s_ease-in-out_infinite_400ms]">.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatAvatar from 'src/features/chat/components/ChatAvatar.vue';
</script>

<style scoped></style>
