import { ref } from "vue";

export type CollapseManage = ReturnType<typeof useCollapse>;

export const useCollapse = () => {
  const leftMenuRef = ref<HTMLDivElement | null>(null);
  const rightMenuRef = ref<HTMLDivElement | null>(null);
  const leftMenuCollapseState = ref<boolean>(true);
  const rightMenuCollapseState = ref<boolean>(true);

  const initMenuInstance = (
    leftRef: HTMLDivElement | null,
    rightRef: HTMLDivElement | null
  ) => {
    leftMenuRef.value = leftRef;
    rightMenuRef.value = rightRef;
  };

  const toggleLeftMenu = () => {
    leftMenuCollapseState.value = !leftMenuCollapseState.value;
  };

  const toggleRightMenu = () => {
    rightMenuCollapseState.value = !rightMenuCollapseState.value;
  };

  return {
    leftMenuCollapseState,
    rightMenuCollapseState,
    initMenuInstance,
    toggleLeftMenu,
    toggleRightMenu,
  };
};
