<template>
  <TransitionGroup name="suggestion" tag="div" class="flex flex-col gap-2 w-full max-w-[560px]">
    <div
      v-for="text in [currentSuggestion]"
      :key="text"
      class="flex w-full py-2 items-center gap-2"
    >
      <div class="w-4 h-4 flex-shrink-0 flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="14" height="14" rx="3" class="fill-teal-300" opacity="0.4" />
          <rect
            x="1"
            y="1"
            width="14"
            height="14"
            rx="3"
            class="stroke-teal-300"
            stroke-width="2"
          />
          <line x1="4" y1="5" x2="12" y2="5" class="stroke-teal-300" stroke-width="1.5" />
          <line x1="4" y1="8" x2="12" y2="8" class="stroke-teal-300" stroke-width="1.5" />
          <line x1="4" y1="11" x2="12" y2="11" class="stroke-teal-300" stroke-width="1.5" />
        </svg>
      </div>
      <div class="flex flex-col justify-center items-start flex-1">
        <p
          class="text-gray-700 font-inter font-sm font-normal leading-normal tracking-[0.5px] text-left"
        >
          {{ text }}
        </p>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const suggestions = [
  'Upload your supplier list',
  'Compare product prices',
  'Find best deals',
  'Track order status',
];

const currentIndex = ref(0);
const currentSuggestion = ref(suggestions[0]);
let intervalId: number | null = null;

function rotateSuggestion() {
  currentIndex.value = (currentIndex.value + 1) % suggestions.length;
  const nextSuggestion = suggestions[currentIndex.value];
  if (nextSuggestion) {
    currentSuggestion.value = nextSuggestion;
  }
}

onMounted(() => {
  // Start rotation after 3 seconds
  intervalId = window.setInterval(rotateSuggestion, 3000);
});

onUnmounted(() => {
  // Clean up interval
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped lang="scss">
.fill-teal-300 {
  fill: #64b1b5;
}

.stroke-teal-300 {
  stroke: #64b1b5;
}

// Suggestion transition
.suggestion-enter-active,
.suggestion-leave-active {
  transition: all 0.5s ease;
}

.suggestion-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.suggestion-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
