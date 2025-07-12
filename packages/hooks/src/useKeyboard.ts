import { onMounted, onUnmounted } from "vue";

export interface KeyboardHandler {
  key: string; // 按键，多个按键用逗号分隔，如 "ctrl+c", "ctrl+shift+a"
  handler: (event: KeyboardEvent) => void;
}

export type KeyboardManage = ReturnType<typeof useKeyboard>;

export const useKeyboard = (handlers: KeyboardHandler[]) => {
  // 解析按键字符串，支持组合键
  const parseKey = (keyStr: string): string[] => {
    return keyStr
      .toLowerCase()
      .split(",")
      .map((k) => k.trim());
  };

  // 检查按键是否匹配
  const isKeyMatch = (event: KeyboardEvent, keyStr: string): boolean => {
    const keys = parseKey(keyStr);
    const eventKey = event.key.toLowerCase();
    const eventCode = event.code.toLowerCase();

    return keys.some((key) => {
      const keyParts = key.split("+").map((k) => k.trim());

      // 检查修饰键
      const hasCtrl = keyParts.includes("ctrl") === event.ctrlKey;
      const hasShift = keyParts.includes("shift") === event.shiftKey;
      const hasAlt = keyParts.includes("alt") === event.altKey;
      const hasMeta = keyParts.includes("meta") === event.metaKey;

      // 检查主键
      const mainKey = keyParts.find(
        (k) => !["ctrl", "shift", "alt", "meta"].includes(k)
      );
      const keyMatch =
        mainKey &&
        (eventKey === mainKey ||
          eventCode === mainKey ||
          eventCode.replace("key", "") === mainKey);

      return hasCtrl && hasShift && hasAlt && hasMeta && keyMatch;
    });
  };

  // 键盘事件处理函数
  const handleKeyDown = (event: KeyboardEvent) => {
    // 如果焦点在输入框中，不处理快捷键
    const target = event.target as HTMLElement;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true")
    ) {
      return;
    }

    // 查找匹配的处理器
    const matchedHandler = handlers.find((handler) =>
      isKeyMatch(event, handler.key)
    );

    if (matchedHandler) {
      event.preventDefault();
      matchedHandler.handler(event);
    }
  };

  // 挂载时绑定事件
  onMounted(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  // 卸载时移除事件
  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });

  // 返回一些工具方法
  return {
    // 手动添加处理器（运行时）
    addHandler: (handler: KeyboardHandler) => {
      handlers.push(handler);
    },

    // 移除处理器
    removeHandler: (key: string) => {
      const index = handlers.findIndex((h) => h.key === key);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    },

    // 获取所有处理器
    getHandlers: () => [...handlers],

    // 清空所有处理器
    clearHandlers: () => {
      handlers.length = 0;
    },
  };
};
