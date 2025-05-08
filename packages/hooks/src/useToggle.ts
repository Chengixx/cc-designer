import { isUndefined } from "lodash-es";
import { Ref, ref } from "vue";

export const useToggle = (
  initValue: boolean = false
): [Ref<boolean>, (toggleValue?: boolean) => void] => {
  const state = ref<boolean>(initValue);

  const toggle = (toggleValue?: boolean) => {
    if (!isUndefined(toggleValue)) {
      state.value = toggleValue;
    } else {
      state.value = !state.value;
    }
  };

  return [state, toggle] as const;
};
