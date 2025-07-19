import { onMounted, Ref } from "vue";
import { useToggle } from "./useToggle";

export type CollapseManage = ReturnType<typeof useCollapse>;

export const useCollapse = () => {
  const [leftMenuCollapseState, toggleLeftMenu] = useToggle(true);
  const [rightMenuCollapseState, toggleRightMenu] = useToggle(true);

  return {
    leftMenuCollapseState,
    rightMenuCollapseState,
    toggleLeftMenu,
    toggleRightMenu,
  };
};
