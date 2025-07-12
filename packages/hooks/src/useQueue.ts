import { QueueController, QueueItem } from "@cgx-designer/controller";
import { ElementManage } from "./useElement";
import { FocusManage } from "./useFocus";
import { deepClone } from "@cgx-designer/utils";
import { onMounted } from "vue";

export type QueueManage = ReturnType<typeof useQueue>;

export const useQueue = (
  elementManage: ElementManage,
  focusManage: FocusManage
) => {
  const execute = (item: QueueItem) => {
    elementManage.setElementList(item.elementList);
    if (item.focusElementId) {
      focusManage.handleFocusById(item.focusElementId);
    }
    if (elementManage.elementList.value.length === 0) {
      focusManage.resetFocus();
    }
  };
  const queueController = new QueueController(execute, 100);

  const push = (type: string = "default") => {
    const elementList = deepClone(elementManage.elementList.value);
    const focusElementId = focusManage.focusedElement.value?.id;
    queueController.push({
      type,
      elementList,
      focusElementId: focusElementId || null,
    });
  };

  const undo = () => queueController.undo();

  const redo = () => queueController.redo();

  // 使用计算属性获取状态
  const canUndo = () => queueController.canUndo.value;
  const canRedo = () => queueController.canRedo.value;
  const currentState = () => queueController.currentState.value;
  const undoCount = () => queueController.undoCount.value;
  const redoCount = () => queueController.redoCount.value;

  const clear = () => queueController.clear();

  const getStats = () => queueController.getStats();

  const getInstance = () => queueController;

  onMounted(() => {
    push("init");
  });

  return {
    push,
    undo,
    redo,
    canUndo,
    canRedo,
    currentState,
    undoCount,
    redoCount,
    clear,
    getStats,
    getInstance,
  };
};
