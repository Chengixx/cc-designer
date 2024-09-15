import { events } from "@cgx-designer/utils";
import { HoverManage } from "./useHover";
import { FocusManage } from "./useFocus";

export interface DragManage {
  handleDropStart: (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => void;
  handleDropEnd: (hoverManager: HoverManage, focusManage?: FocusManage) => void;
}

export const useDrag = (): DragManage => {
  const handleDropStart = (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => {
    if (focusManage) {
      focusManage.focusTransition.value = false;
    }
    hoverManager.setDisableHoverStatus();
    hoverManager.setShowHoverBox();
    hoverManager.setHoverElementId();
    events.emit("start");
  };
  const handleDropEnd = (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => {
    if (focusManage) {
      focusManage.setFocusWidgetStyle();
      focusManage.focusTransition.value = true;
    }
    hoverManager.setDisableHoverStatus(false);
    events.emit("end");
  };
  return { handleDropStart, handleDropEnd };
};
