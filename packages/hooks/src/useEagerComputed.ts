//立刻相应的计算属性
import { watchEffect, shallowRef, readonly } from "vue";

export function useEagerComputed(fn: Function) {
  const result = shallowRef();
  watchEffect(
    () => {
      result.value = fn();
    },
    {
      flush: "sync",
    }
  );

  return readonly(result);
}
