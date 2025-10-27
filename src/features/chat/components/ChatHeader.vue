<template>
  <div
    class="flex items-start gap-1 px-5 py-[18px] bg-teal-700 rounded-t-lg backdrop-blur-[25px]"
  >
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
          <h1 class="text-white font-source-sans font-3xl font-bold leading-normal">
            Nitra AI
          </h1>
          <div class="w-6 h-6 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="text-white"
            >
              <path
                d="M14.5 1.5L9.5 6.5M19.5 6.5L16.5 9.5M14.5 1.5L16.5 9.5M14.5 1.5L6.5 3.5M19.5 6.5L11.5 8.5M19.5 6.5L21.5 14.5M16.5 9.5L11.5 8.5M16.5 9.5L18.5 17.5M6.5 3.5L9.5 6.5M6.5 3.5L1.5 4.5M11.5 8.5L9.5 6.5M21.5 14.5L18.5 17.5M21.5 14.5L22.5 22.5M18.5 17.5L14.5 16.5M9.5 6.5L11.5 14.5M1.5 4.5L4.5 7.5M1.5 4.5L2.5 12.5M4.5 7.5L11.5 14.5M4.5 7.5L6.5 15.5M11.5 14.5L14.5 16.5M2.5 12.5L6.5 15.5M2.5 12.5L4.5 20.5M6.5 15.5L8.5 22.5M14.5 16.5L8.5 22.5M14.5 16.5L22.5 22.5M8.5 22.5L4.5 20.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.7"
              />
            </svg>
          </div>
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12M4 4L12 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
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
