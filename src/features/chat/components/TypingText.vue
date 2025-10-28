<template>
  <span>
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
  typingStart: [];
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  speed: 100,
  delay: 0,
});

const emit = defineEmits<Emits>();

const { displayedContent, isTyping, isComplete } = useTypingAnimation(props.content, {
  enabled: props.enabled,
  speed: props.speed,
  delay: props.delay,
  onStart: () => {
    emit('typingStart');
  },
  onUpdate: () => {
    emit('update');
  },
});

// Watch for completion
import { watch } from 'vue';
watch(isComplete, (value) => {
  if (value) {
    emit('complete');
  }
});

// Expose for parent components
defineExpose({
  displayedContent,
  isTyping,
  isComplete,
});
</script>
