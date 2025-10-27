<template>
  <TransitionGroup name="suggestion" tag="div" class="flex flex-col gap-2 w-full max-w-[560px]">
    <div :key="currentSuggestionData.text" class="flex w-full py-2 items-center gap-2">
      <div class="w-4 h-4 flex-shrink-0 flex items-center justify-center">
        <q-icon :name="currentSuggestionData.icon" size="16px" class="text-teal-300" />
      </div>
      <div class="flex flex-col justify-center items-start flex-1">
        <p
          class="text-gray-700 font-inter font-sm font-normal leading-normal tracking-[0.5px] text-left"
        >
          {{ currentSuggestionData.text }}
        </p>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Suggestion {
  text: string;
  icon: string;
}

const suggestions: Suggestion[] = [
  {
    text: 'Upload your supplier list',
    icon: 'fas fa-cloud-arrow-up',
  },
  {
    text: 'Compare product prices',
    icon: 'fas fa-chart-line',
  },
  {
    text: 'Find best deals',
    icon: 'fas fa-magnifying-glass-dollar',
  },
  {
    text: 'Track order status',
    icon: 'fas fa-truck-fast',
  },
];

const currentIndex = ref(0);
const currentSuggestionData = computed((): Suggestion => {
  return suggestions[currentIndex.value] as Suggestion;
});
let intervalId: number | null = null;

function rotateSuggestion() {
  currentIndex.value = (currentIndex.value + 1) % suggestions.length;
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
.text-teal-300 {
  color: #64b1b5;
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
