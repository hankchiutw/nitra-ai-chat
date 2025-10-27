<template>
  <div class="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-end gap-3 z-50">
    <!-- Chat Window -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="flex flex-col w-[90vw] max-w-[780px] bg-white rounded-lg shadow-chat"
      >
        <!-- Header -->
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
                <h1 class="text-white font-source-sans text-[30px] font-bold leading-normal">
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
              <p class="text-white font-source-sans text-base font-normal leading-7">
                Hi there, How can we help?
              </p>
            </div>
          </div>
          <!-- Close Button -->
          <button
            @click="isOpen = false"
            class="w-4 h-4 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Close chat"
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

        <!-- Body -->
        <div class="flex h-[420px] px-5 pt-8 pb-5 flex-col justify-between items-start bg-white">
          <!-- Chat Messages -->
          <div class="flex flex-col gap-5 w-full">
            <!-- AI Message -->
            <div class="flex items-start gap-2.5">
              <!-- Avatar -->
              <div class="w-6 h-6 relative flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" class="fill-teal-700" />
                </svg>
                <div class="absolute left-1 top-2 w-4 h-2 flex justify-center items-center">
                  <svg
                    width="16"
                    height="8"
                    viewBox="0 0 16 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9996 8C5.56054 7.98149 7.63135 4.00525 4.00031 4.00008V0C9.50917 0.0080055 8.02416 3.99425 11.9996 3.99992V7.99983V8Z"
                      fill="white"
                    />
                    <path d="M16 0H11.9997V3.99992H16V0Z" fill="white" />
                    <path d="M4.00033 3.99988H0V7.99979H4.00033V3.99988Z" fill="white" />
                  </svg>
                </div>
              </div>
              <!-- Message Content -->
              <div class="flex flex-col items-start gap-1.5">
                <div
                  class="flex max-w-[600px] px-4 py-2.5 items-start gap-2 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-gray-0"
                >
                  <p
                    class="flex-1 text-[#0D082C] font-inter text-base font-normal leading-normal tracking-[0.5px]"
                  >
                    Welcome to Nitra AI!
                  </p>
                </div>
              </div>
            </div>

            <!-- Suggestion Item -->
            <div class="flex w-full max-w-[560px] py-2 items-center gap-2">
              <div class="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="14"
                    height="14"
                    rx="3"
                    class="fill-teal-300"
                    opacity="0.4"
                  />
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
                  class="text-gray-700 font-inter text-sm font-normal leading-normal tracking-[0.5px]"
                >
                  Upload your supplier list
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="h-px w-full bg-gray-100"></div>

        <!-- Typing Area -->
        <div class="flex px-5 py-4 justify-between items-center bg-white rounded-b-lg">
          <div class="flex items-center gap-5">
            <input
              type="text"
              placeholder="Say something..."
              v-model="messageInput"
              class="text-[#0D082C]/60 font-source-sans text-base font-normal leading-6 outline-none bg-transparent min-w-[200px] md:min-w-[400px]"
            />
          </div>
          <div class="flex items-center gap-5">
            <!-- Attachment Button -->
            <button
              class="w-5 h-5 flex items-center justify-center text-gray-600 hover:opacity-80 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 8.75V13.75C17.5 16.0972 15.5972 18 13.25 18C10.9028 18 9 16.0972 9 13.75V7.5C9 5.84315 10.3431 4.5 12 4.5C13.6569 4.5 15 5.84315 15 7.5V12.75C15 13.5784 14.3284 14.25 13.5 14.25C12.6716 14.25 12 13.5784 12 12.75V8.75"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <!-- Send Button -->
            <button
              class="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-teal-700 hover:opacity-90 transition-opacity"
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
      </div>
    </Transition>

    <!-- Help Button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-500 shadow-button hover:opacity-90 transition-opacity"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-white"
      >
        <path
          d="M9.667 1L6.333 4.333M13 4.333L11 6.333M9.667 1L11 6.333M9.667 1L4.333 2.333M13 4.333L7.667 5.667M13 4.333L14.333 9.667M11 6.333L7.667 5.667M11 6.333L12.333 11.667M4.333 2.333L6.333 4.333M4.333 2.333L1 3M7.667 5.667L6.333 4.333M14.333 9.667L12.333 11.667M14.333 9.667L15 15M12.333 11.667L9.667 11M6.333 4.333L7.667 9.667M1 3L3 4.667M1 3L1.667 8.333M3 4.667L7.667 9.667M3 4.667L4.333 10.333M7.667 9.667L9.667 11M1.667 8.333L4.333 10.333M1.667 8.333L3 13.667M4.333 10.333L5.667 15M9.667 11L5.667 15M9.667 11L15 15M5.667 15L3 13.667"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        class="text-white text-center font-inter text-sm font-semibold leading-5 tracking-[0.07px]"
      >
        Ask Nitra AI
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(true);
const messageInput = ref('');
</script>

<style scoped lang="scss">
.shadow-chat {
  box-shadow: 0 30px 60px 0 rgba(38, 77, 79, 0.25);
}

.shadow-button {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.fill-teal-700 {
  fill: $teal-700;
}

.fill-teal-300 {
  fill: $teal-300;
}

.stroke-teal-300 {
  stroke: $teal-300;
}
</style>
