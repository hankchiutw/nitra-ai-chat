<template>
  <div
    class="flex px-5 py-4 justify-between items-center bg-white rounded-b-lg border-t border-gray-100"
  >
    <div class="flex items-center gap-5 flex-1">
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        placeholder="Say something..."
        class="text-[#0D082C]/60 font-source-sans font-md font-normal leading-6 outline-none bg-transparent min-w-[200px] flex-1"
        :disabled="disabled"
        @keydown.enter="handleSend"
      />
    </div>
    <div class="flex items-center gap-5">
      <!-- Attachment Button -->
      <button
        class="w-5 h-5 flex items-center justify-center text-gray-600 hover:opacity-80 transition-opacity opacity-40"
        :disabled="disabled"
      >
        <q-icon name="fas fa-paperclip" size="25px" />
      </button>
      <!-- Send Button -->
      <button
        class="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-teal-700 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canSend"
        @click="handleSend"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  disabled?: boolean;
  modelValue?: string;
}

interface Emits {
  send: [message: string];
  'update:modelValue': [value: string];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: '',
});

const emit = defineEmits<Emits>();

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const canSend = computed(() => {
  return !props.disabled && inputValue.value.trim().length > 0;
});

function handleSend() {
  if (!canSend.value) {
    return;
  }

  const message = inputValue.value.trim();
  if (message) {
    emit('send', message);
    inputValue.value = '';
  }
}

function focus() {
  inputRef.value?.focus();
}

defineExpose({
  focus,
});
</script>
