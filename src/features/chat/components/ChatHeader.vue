<template>
  <div class="flex items-start gap-1 px-5 py-[18px] bg-teal-700 rounded-t-lg backdrop-blur-[25px]">
    <div class="flex flex-col items-start gap-1 flex-1">
      <div class="flex items-center gap-4">
        <!-- Logo -->
        <div class="flex w-[46px] h-[23px] justify-center items-center aspect-[2/1]">
          <svg
            width="46"
            height="23"
            viewBox="0 0 46 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.4991 23C15.9867 22.9468 21.9402 11.5151 11.501 11.5002V0C27.339 0.0230158 23.0696 11.4835 34.4991 11.4998V22.9995V23Z"
              fill="white"
            />
            <path d="M46 0H34.499V11.4998H46V0Z" fill="white" />
            <path d="M11.501 11.4998H0V22.9995H11.501V11.4998Z" fill="white" />
          </svg>
        </div>
        <!-- Title -->
        <div class="flex items-center gap-4">
          <div class="text-white font-source-sans font-3xl font-bold leading-normal">Nitra AI</div>
          <q-icon name="fas fa-wand-magic-sparkles" size="24px" class="text-white" />
        </div>
      </div>
      <div class="flex h-6 flex-col justify-center items-start">
        <p class="text-white font-source-sans font-md font-normal leading-7">
          Hi there, How can we help?
        </p>
      </div>
    </div>
    <!-- Close Button -->
    <button
      class="w-4 h-4 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
      aria-label="Close chat"
      @click="handleClose"
    >
      <q-icon name="fas fa-xmark" size="16px" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  close: [];
}

const emit = defineEmits<Emits>();

function handleClose() {
  emit('close');
}
</script>
