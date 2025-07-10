import { QueueController, QueueItem } from "@cgx-designer/controller";

export const useQueue = () => {
  const queueController = new QueueController();

  const getQueue = () => {
    return queueController.queue;
  };

  const push = (item: Omit<QueueItem, "id" | "timestamp">) => {
    queueController.push(item);
  };

  const undo = () => {
    queueController.undo();
  };

  const redo = () => {
    queueController.redo();
  };

  const clear = () => {
    queueController.clear();
  };

  return { getQueue, push, undo, redo, clear };
};
