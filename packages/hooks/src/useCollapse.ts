import { onMounted, Ref } from "vue";
import { useToggle } from "./useToggle";

export type CollapseManage = ReturnType<typeof useCollapse>;

export const useCollapse = (
  leftMenuRef: Ref<HTMLDivElement | null>,
  rightMenuRef: Ref<HTMLDivElement | null>
) => {
  const [leftMenuCollapseState, toggleLeftMenu] = useToggle(true);
  const [rightMenuCollapseState, toggleRightMenu] = useToggle(true);

  onMounted(() => {
    leftMenuRef.value = leftMenuRef.value;
    rightMenuRef.value = rightMenuRef.value;
  });

  return {
    leftMenuCollapseState,
    rightMenuCollapseState,
    toggleLeftMenu,
    toggleRightMenu,
  };
};
