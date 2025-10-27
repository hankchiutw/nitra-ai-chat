<template>
  <button
    class="flex w-full max-w-[560px] py-2 items-center gap-2 hover:bg-gray-50 transition-colors rounded-lg cursor-pointer"
    @click="handleClick"
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
        <rect x="1" y="1" width="14" height="14" rx="3" class="stroke-teal-300" stroke-width="2" />
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
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
}

interface Emits {
  click: [text: string];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleClick() {
  emit('click', props.text);
}
</script>

<style scoped lang="scss">
.fill-teal-300 {
  fill: #64b1b5;
}

.stroke-teal-300 {
  stroke: #64b1b5;
}
</style>
