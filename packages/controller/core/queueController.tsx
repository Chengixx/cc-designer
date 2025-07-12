import { IEditorElement } from "@cgx-designer/types";
import { ref, computed } from "vue";

export interface QueueItem {
  type: string;
  elementList: IEditorElement[];
  focusElementId: string | null;
}

export class QueueController {
  // 撤销列表 - 存储可以撤销的状态
  private _undoList = ref<QueueItem[]>([]);
  // 重做列表 - 存储可以重做的状态
  private _redoList = ref<QueueItem[]>([]);
  // 当前状态
  private _currentState = ref<QueueItem | null>(null);
  private _maxLength: number;
  private _execute: (item: QueueItem) => void;
  // 标记是否已经初始化
  private _isInitialized = ref(false);
  // 防抖相关
  private _debounceTimer: NodeJS.Timeout | null = null;
  private _debounceDelay: number;
  private _pendingItem: QueueItem | null = null;

  // 计算属性
  readonly canUndo = computed(() => this._undoList.value.length > 0);
  readonly canRedo = computed(() => this._redoList.value.length > 0);
  readonly currentState = computed(() => this._currentState.value);
  readonly undoCount = computed(() => this._undoList.value.length);
  readonly redoCount = computed(() => this._redoList.value.length);

  constructor(
    execute: (item: QueueItem) => void,
    maxLength: number = 50,
    debounceDelay: number = 200
  ) {
    this._undoList.value = [];
    this._redoList.value = [];
    this._currentState.value = null;
    this._maxLength = maxLength;
    this._execute = execute;
    this._isInitialized.value = false;
    this._debounceDelay = debounceDelay;
  }

  /**
   * 添加新状态到队列（带防抖）
   * @param item 新的状态
   */
  push(item: QueueItem) {
    // 保存最新的 item
    this._pendingItem = item;

    // 清除之前的定时器
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    // 设置新的防抖定时器
    this._debounceTimer = setTimeout(() => {
      if (this._pendingItem) {
        this._pushInternal(this._pendingItem);
        this._pendingItem = null;
      }
    }, this._debounceDelay);
  }

  /**
   * 立即执行 push（跳过防抖）
   * @param item 新的状态
   */
  pushImmediate(item: QueueItem) {
    // 清除防抖定时器
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }

    this._pendingItem = null;
    this._pushInternal(item);
  }

  /**
   * 内部 push 方法，实际执行添加逻辑
   * @param item 新的状态
   */
  private _pushInternal(item: QueueItem) {
    // 如果是第一次 push，直接设置当前状态，不加入撤销列表
    if (!this._isInitialized.value) {
      this._currentState.value = item;
      this._isInitialized.value = true;
      return;
    }

    // 如果有当前状态，将其加入撤销列表
    if (this._currentState.value !== null) {
      this._undoList.value.push(this._currentState.value);

      // 限制撤销列表长度
      if (this._undoList.value.length > this._maxLength) {
        this._undoList.value.shift();
      }
    }

    // 设置新状态
    this._currentState.value = item;

    // 清空重做列表（因为有了新的操作）
    this._redoList.value = [];
  }

  /**
   * 撤销操作
   * @returns 是否成功撤销
   */
  undo(): boolean {
    if (!this.canUndo.value) {
      return false;
    }

    // 从撤销列表取出上一个状态
    const previousState = this._undoList.value.pop()!;

    // 将当前状态加入重做列表
    if (this._currentState.value !== null) {
      this._redoList.value.push(this._currentState.value);
    }

    // 设置新状态并执行
    this._currentState.value = previousState;
    this._execute(previousState);

    return true;
  }

  /**
   * 重做操作
   * @returns 是否成功重做
   */
  redo(): boolean {
    if (!this.canRedo.value) {
      return false;
    }

    // 从重做列表取出下一个状态
    const nextState = this._redoList.value.pop()!;

    // 将当前状态加入撤销列表
    if (this._currentState.value !== null) {
      this._undoList.value.push(this._currentState.value);
    }

    // 设置新状态并执行
    this._currentState.value = nextState;
    this._execute(nextState);

    return true;
  }

  /**
   * 清空所有状态
   */
  clear(): void {
    // 清除防抖定时器
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }

    this._pendingItem = null;
    this._undoList.value = [];
    this._redoList.value = [];
    this._currentState.value = null;
    this._isInitialized.value = false;
  }

  /**
   * 获取统计信息
   */
  getStats() {
    return {
      canUndo: this.canUndo.value,
      canRedo: this.canRedo.value,
      undoCount: this.undoCount.value,
      redoCount: this.redoCount.value,
      maxLength: this._maxLength,
      hasCurrentState: this._currentState.value !== null,
      isInitialized: this._isInitialized.value,
      debounceDelay: this._debounceDelay,
      hasPendingItem: this._pendingItem !== null,
    };
  }
}
