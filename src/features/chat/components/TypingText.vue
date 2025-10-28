<template>
  <span @click="handleClick">
    <slot :content="displayedContent" :is-typing="isTyping" :is-complete="isComplete">
      {{ displayedContent }}
    </slot>
  </span>
</template>

<script setup lang="ts">
import { useTypingAnimation } from 'src/features/chat/composables/useTypingAnimation';

interface Props {
  content: string;
  enabled?: boolean;
  speed?: number;
  delay?: number;
}

interface Emits {
  update: [];
  complete: [];
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  speed: 100,
  delay: 0,
});

const emit = defineEmits<Emits>();

const { displayedContent, isTyping, isComplete, skipAnimation } = useTypingAnimation(
  props.content,
  {
    enabled: props.enabled,
    speed: props.speed,
    delay: props.delay,
    onUpdate: () => {
      emit('update');
    },
  },
);

// Watch for completion
import { watch } from 'vue';
watch(isComplete, (value) => {
  if (value) {
    emit('complete');
  }
});

function handleClick() {
  if (props.enabled && isTyping.value) {
    skipAnimation();
  }
}

// Expose for parent components
defineExpose({
  displayedContent,
  isTyping,
  isComplete,
  skipAnimation,
});
</script>
