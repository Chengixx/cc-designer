import { events } from "@cgx-designer/utils";
import { HoverManage } from "./useHover";

export interface DragManage {
  handleDropStart: (event: DragEvent, hoverManager: HoverManage) => void;
  handleDropEnd: (event: DragEvent, hoverManager: HoverManage) => void;
}

export const useDrag = (): DragManage => {
  const handleDropStart = (event: DragEvent, hoverManager: HoverManage) => {
    hoverManager.setDisableHoverStatus();
    hoverManager.setShowHoverBox();
    hoverManager.setHoverElementId();
    events.emit("start");
  };
  const handleDropEnd = (event: DragEvent, hoverManager: HoverManage) => {
    hoverManager.setDisableHoverStatus(false);
    events.emit("end");
  };
  return { handleDropStart, handleDropEnd };
};
