import { HoverManage } from "./useHover";
import { FocusManage } from "./useFocus";
import { ref } from "vue";
import { IElementSchema } from "@cgx-designer/types";

export type DragManage = ReturnType<typeof useDrag>;

export const useDrag = () => {
  const dragStartElement = ref<IElementSchema | null>(null);
  const handleDrapStart = (
    hoverManager: HoverManage,
    focusManager?: FocusManage
  ) => {
    if (focusManager) {
      dragStartElement.value = focusManager.focusedElement.value;
      focusManager.focusTransition.value = false;
      focusManager.startFocusTimedQuery();
    }
    hoverManager.setDisableHoverStatus();
    hoverManager.setShowHoverBox();
    hoverManager.setHoveredElement();
  };
  const handleDrapEnd = (
    hoverManager: HoverManage,
    focusManager?: FocusManage
  ) => {
    if (focusManager) {
      focusManager.stopFocusTimedQuery();
      focusManager.focusTransition.value = true;
      if (dragStartElement.value) {
        focusManager.handleFocus(dragStartElement.value);
        dragStartElement.value = null;
      }
    }
    hoverManager.setDisableHoverStatus(false);
  };
  return { handleDrapStart, handleDrapEnd };
};
