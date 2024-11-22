import { events } from "@cgx-designer/utils";
import { HoverManage } from "./useHover";
import { FocusManage } from "./useFocus";

export type DragManage = ReturnType<typeof useDrag>;

export const useDrag = () => {
  const handleDropStart = (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => {
    if (focusManage) {
      focusManage.focusTransition.value = false;
      focusManage.startFocusTimedQuery();
    }
    hoverManager.setDisableHoverStatus();
    hoverManager.setShowHoverBox();
    hoverManager.setHoveredElement();
    events.emit("start");
  };
  const handleDropEnd = (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => {
    if (focusManage) {
      focusManage.stopFocusTimedQuery();
      focusManage.focusTransition.value = true;
    }
    hoverManager.setDisableHoverStatus(false);
    events.emit("end");
  };
  return { handleDropStart, handleDropEnd };
};
