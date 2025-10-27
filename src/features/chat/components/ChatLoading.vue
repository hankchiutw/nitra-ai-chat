<template>
  <div class="flex items-center justify-center gap-2 py-3">
    <div class="flex items-center gap-2">
      <div
        v-for="i in 3"
        :key="i"
        class="w-2 h-2 rounded-full bg-teal-300 animate-bounce"
        :style="{ animationDelay: `${i * 0.15}s` }"
      ></div>
    </div>
    <span class="text-gray-600 font-inter font-sm">Nitra AI is typing...</span>
  </div>
</template>

<script setup lang="ts">
// Loading indicator component
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
