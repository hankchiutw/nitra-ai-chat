import { onMounted, ref, watch } from 'vue';

interface UseTypingAnimationOptions {
  enabled?: boolean;
  speed?: number; // characters per second
  delay?: number; // initial delay in ms
  onUpdate?: () => void; // callback for each character update
}

/**
 * Composable for typing animation effect
 */
export function useTypingAnimation(content: string, options: UseTypingAnimationOptions = {}) {
  const {
    enabled = true,
    speed = 100, // characters per second
    delay = 0,
    onUpdate,
  } = options;

  const displayedContent = ref('');
  const isTyping = ref(false);
  const isComplete = ref(false);

  let animationFrame: number | null = null;
  let startTime: number | null = null;
  let timeoutId: number | null = null;

  function startTyping() {
    if (!enabled || !content) {
      displayedContent.value = content;
      isComplete.value = true;
      onUpdate?.();
      return;
    }

    isTyping.value = true;
    isComplete.value = false;
    displayedContent.value = '';

    const start = () => {
      startTime = performance.now();
      animate();
    };

    if (delay > 0) {
      timeoutId = window.setTimeout(start, delay);
    } else {
      start();
    }
  }

  function animate() {
    if (!startTime || !content) return;

    const elapsed = performance.now() - startTime;
    const charsToShow = Math.min(Math.floor((elapsed / 1000) * speed), content.length);

    displayedContent.value = content.substring(0, charsToShow);

    // Call onUpdate callback when content changes
    onUpdate?.();

    if (charsToShow < content.length) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      isTyping.value = false;
      isComplete.value = true;
      onUpdate?.();
    }
  }

  function reset() {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    displayedContent.value = '';
    isTyping.value = false;
    isComplete.value = false;
    startTime = null;
  }

  // Start animation on mount
  onMounted(() => {
    startTyping();
  });

  // Watch for content changes
  watch(
    () => content,
    () => {
      reset();
      startTyping();
    },
  );

  return {
    displayedContent,
    isTyping,
    isComplete,
    reset,
  };
}
