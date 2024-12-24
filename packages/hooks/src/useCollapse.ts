import { ref } from "vue";
import { useToggle } from "./useToggle";

export type CollapseManage = ReturnType<typeof useCollapse>;

export const useCollapse = () => {
  const leftMenuRef = ref<HTMLDivElement | null>(null);
  const rightMenuRef = ref<HTMLDivElement | null>(null);

  const [leftMenuCollapseState, toggleLeftMenu] = useToggle(true);
  const [rightMenuCollapseState, toggleRightMenu] = useToggle(true);

  const initMenuInstance = (
    leftRef: HTMLDivElement | null,
    rightRef: HTMLDivElement | null
  ) => {
    leftMenuRef.value = leftRef;
    rightMenuRef.value = rightRef;
  };

  return {
    leftMenuCollapseState,
    rightMenuCollapseState,
    initMenuInstance,
    toggleLeftMenu,
    toggleRightMenu,
  };
};
