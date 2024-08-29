import { events } from "@/config/events";
import { usehoverStoreHook } from "@/store/modules/hover";

const useDrag = () => {
  const handleDropStart = (event: DragEvent) => {
    usehoverStoreHook().setDisableHoverStatus();
    usehoverStoreHook().setShowHoverBox();
    usehoverStoreHook().setHoverElementId();
    events.emit("start");
  };
  const handleDropEnd = (event: DragEvent) => {
    usehoverStoreHook().setDisableHoverStatus(false);
    events.emit("end");
  };
  return { handleDropStart, handleDropEnd };
};

export default useDrag;
