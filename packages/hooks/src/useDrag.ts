import { events } from "@cgx-designer/utils";
import { HoverManage } from "./useHover";

const useDrag = () => {
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

export default useDrag;
