<template>
  <Transition name="slide-up" mode="out-in">
    <div :key="currentSuggestionData.text" class="flex gap-2">
      <div>
        <q-icon :name="currentSuggestionData.icon" size="16px" class="text-teal-300" />
      </div>
      <div class="text-gray-700 font-sm">
        {{ currentSuggestionData.text }}
      </div>
    </div>
  </Transition>
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
    icon: 'fas fa-list',
  },
  {
    text: 'Check if Avastin is in stock',
    icon: 'fas fa-cart-shopping',
  },
  {
    text: "Check if there's a better price for Xeomin",
    icon: 'fas fa-hand-holding-dollar',
  },
  {
    text: 'What are some generic options for Restylane',
    icon: 'fas fa-magnifying-glass',
  },
  {
    text: "What's the best product for Xeomin",
    icon: 'fas fa-thumbs-up',
  },
];

const defaultSuggestion: Suggestion = {
  text: 'Upload your supplier list',
  icon: 'fas fa-cloud-arrow-up',
};

const currentIndex = ref(0);
const currentSuggestionData = computed((): Suggestion => {
  const suggestion = suggestions[currentIndex.value];
  return suggestion ?? defaultSuggestion;
});
let intervalId: number | null = null;

function rotateSuggestion() {
  currentIndex.value = (currentIndex.value + 1) % suggestions.length;
}

onMounted(() => {
  // Start rotation after 3 seconds
  intervalId = window.setInterval(rotateSuggestion, 2000);
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
