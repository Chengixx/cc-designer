import { onMounted, onUnmounted } from "vue";

export interface KeyboardHandler {
  key: string; // 按键，多个按键用逗号分隔，如 "ctrl+c", "ctrl+shift+a", "cmd+z"
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

      // 检查主键
      const mainKey = keyParts.find(
        (k) => !["ctrl", "shift", "alt", "meta", "cmd"].includes(k)
      );
      const keyMatch =
        mainKey &&
        (eventKey === mainKey ||
          eventCode === mainKey ||
          eventCode.replace("key", "") === mainKey);

      // 检查所有修饰键是否都匹配
      const requiredModifiers = keyParts.filter((k) =>
        ["ctrl", "shift", "alt", "meta", "cmd"].includes(k)
      );

      let modifierMatch = true;

      // 检查每个修饰键
      if (requiredModifiers.includes("ctrl")) {
        modifierMatch = modifierMatch && (event.ctrlKey || event.metaKey);
      }
      if (requiredModifiers.includes("cmd")) {
        modifierMatch = modifierMatch && event.metaKey;
      }
      if (requiredModifiers.includes("shift")) {
        modifierMatch = modifierMatch && event.shiftKey;
      }
      if (requiredModifiers.includes("alt")) {
        modifierMatch = modifierMatch && event.altKey;
      }
      if (requiredModifiers.includes("meta")) {
        modifierMatch = modifierMatch && event.metaKey;
      }

      // 确保没有额外的修饰键被按下（除了 ctrl/cmd 的跨平台兼容）
      const hasExtraModifiers =
        (event.ctrlKey && !keyParts.includes("ctrl")) ||
        (event.shiftKey && !keyParts.includes("shift")) ||
        (event.altKey && !keyParts.includes("alt")) ||
        (event.metaKey &&
          !keyParts.includes("meta") &&
          !keyParts.includes("cmd") &&
          !keyParts.includes("ctrl"));

      return modifierMatch && keyMatch && !hasExtraModifiers;
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

  // 卸载时记得移除事件
  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });

  return {
    addHandler: (handler: KeyboardHandler) => {
      handlers.push(handler);
    },
    removeHandler: (key: string) => {
      const index = handlers.findIndex((h) => h.key === key);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    },
    getHandlers: () => [...handlers],
    clearHandlers: () => {
      handlers.length = 0;
    },
  };
};
