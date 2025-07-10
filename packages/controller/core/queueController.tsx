import { getRandomId } from "@cgx-designer/utils";
import { ref, readonly } from "vue";

export interface QueueItem {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  description?: string;
}

export class QueueController {
  private _queue = ref<QueueItem[]>([]);
  private _currentIndex = ref<number>(-1);
  private readonly _maxSize = 50;

  // 公共访问器
  get queue() {
    return readonly(this._queue);
  }

  get currentIndex() {
    return readonly(this._currentIndex);
  }

  get canUndo() {
    return this._currentIndex.value > 0;
  }

  get canRedo() {
    return this._currentIndex.value < this._queue.value.length - 1;
  }

  get currentItem() {
    return this._queue.value[this._currentIndex.value] || null;
  }

  // 添加操作到队列
  push = (item: Omit<QueueItem, "id" | "timestamp">) => {
    const queueItem: QueueItem = {
      ...item,
      id: getRandomId(),
      timestamp: Date.now(),
    };

    // 如果当前不在队列末尾，删除后面的操作
    if (this._currentIndex.value < this._queue.value.length - 1) {
      this._queue.value = this._queue.value.slice(
        0,
        this._currentIndex.value + 1
      );
    }

    // 添加新操作
    this._queue.value.push(queueItem);

    // 如果超过最大大小，删除最旧的操作并调整索引
    if (this._queue.value.length > this._maxSize) {
      this._queue.value.shift();
      // 索引不需要调整，因为删除的是最旧的操作
    } else {
      this._currentIndex.value++;
    }
  };

  // 撤销操作
  undo = () => {
    if (!this.canUndo) return null;

    this._currentIndex.value--;
    return this._queue.value[this._currentIndex.value];
  };

  // 重做操作
  redo = () => {
    if (!this.canRedo) return null;

    this._currentIndex.value++;
    return this._queue.value[this._currentIndex.value];
  };

  // 清空队列
  clear = () => {
    this._queue.value = [];
    this._currentIndex.value = -1;
  };

  // 获取指定索引的操作
  getItem = (index: number) => {
    if (index < 0 || index >= this._queue.value.length) {
      return null;
    }
    return this._queue.value[index];
  };

  // 跳转到指定操作
  goTo = (index: number) => {
    if (index < 0 || index >= this._queue.value.length) {
      return false;
    }
    this._currentIndex.value = index;
    return true;
  };

  // 获取队列统计信息
  getStats = () => {
    return {
      total: this._queue.value.length,
      current: this._currentIndex.value + 1,
      canUndo: this.canUndo,
      canRedo: this.canRedo,
      maxSize: this._maxSize,
    };
  };
}
