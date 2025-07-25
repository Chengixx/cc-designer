import { HoverManage } from "./useHover";
import { FocusManage } from "./useFocus";
import { ref } from "vue";
import { IElementSchema } from "@cgx-designer/types";

export type DragManage = ReturnType<typeof useDrag>;

export const useDrag = () => {
  const dragStartElement = ref<IElementSchema | null>(null);
  const handleDrapStart = (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => {
    if (focusManage) {
      dragStartElement.value = focusManage.focusedElement.value;
      focusManage.focusTransition.value = false;
      focusManage.startFocusTimedQuery();
    }
    hoverManager.setDisableHoverStatus();
    hoverManager.setShowHoverBox();
    hoverManager.setHoveredElement();
  };
  const handleDrapEnd = (
    hoverManager: HoverManage,
    focusManage?: FocusManage
  ) => {
    if (focusManage) {
      focusManage.stopFocusTimedQuery();
      focusManage.focusTransition.value = true;
      if (dragStartElement.value) {
        focusManage.handleFocus(dragStartElement.value);
        dragStartElement.value = null;
      }
    }
    hoverManager.setDisableHoverStatus(false);
  };
  return { handleDrapStart, handleDrapEnd };
};
