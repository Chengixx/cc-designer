import { QueueController, QueueItem } from "@cgx-designer/controller";
import { ElementManage } from "./useElement";
import { FocusManage } from "./useFocus";
import { deepClone, deepCompareAndModify } from "@cgx-designer/utils";
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

  const push = (type: string = "default", immediate: boolean = false) => {
    const elementList = deepClone(elementManage.elementList.value);
    const focusElementId = focusManage.focusedElement.value?.id;
    const item = {
      type,
      elementList,
      focusElementId: focusElementId || null,
    };

    if (immediate) {
      queueController.pushImmediate(item);
    } else {
      queueController.push(item);
    }
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
    push("init", true); // 初始化时立即执行，跳过防抖
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
