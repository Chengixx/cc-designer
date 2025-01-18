import { ref, onMounted, onUnmounted } from "vue";

export interface TimedQueryOptions {
  timeout?: number;
  startOnMount?: boolean;
}

export interface TimedQuery {
  startTimedQuery: () => void;
  stopTimedQuery: () => void;
}

export const useTimedQuery = (
  handler: () => void,
  options: TimedQueryOptions = { timeout: 16.667, startOnMount: false }
): TimedQuery => {
  const { timeout, startOnMount } = options;
  const timer = ref<number | null>(null);

  const startTimedQuery = () => {
    stopTimedQuery();
    timer.value = window.setInterval(handler, timeout);
  };

  const stopTimedQuery = () => {
    if (timer.value !== null) {
      window.clearInterval(timer.value);
      timer.value = null;
    }
  };

  if (startOnMount) {
    onMounted(() => {
      startTimedQuery();
    });
  }

  onUnmounted(() => {
    if (timer.value !== null) {
      stopTimedQuery();
    }
  });

  return {
    startTimedQuery,
    stopTimedQuery,
  };
};
