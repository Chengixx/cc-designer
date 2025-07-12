import { QueueController, QueueItem } from "@cgx-designer/controller";
import { ElementManage } from "./useElement";
import { FocusManage } from "./useFocus";

export type QueueManage = ReturnType<typeof useQueue>;

export const useQueue = (
  elementManage: ElementManage,
  focusManage: FocusManage
) => {
  const queueController = new QueueController();

  const getQueue = () => {
    return queueController.queue;
  };

  const push = (item: Omit<QueueItem, "id" | "timestamp">) => {
    queueController.push(item);
  };

  const undo = () => {
    queueController.undo();
    elementManage.setElementList(queueController.currentItem!.data);
  };

  const redo = () => {
    queueController.redo();
    elementManage.setElementList(queueController.currentItem!.data);
  };

  const clear = () => {
    queueController.clear();
    elementManage.setElementList([]);
    focusManage.resetFocus();
  };

  return { getQueue, push, undo, redo, clear };
};
