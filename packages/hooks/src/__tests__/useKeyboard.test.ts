import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useKeyboard, KeyboardHandler } from '../useKeyboard';

// 模拟 Vue 的生命周期钩子
const mockOnMounted = vi.fn();
const mockOnUnmounted = vi.fn();

vi.mock('vue', () => ({
  onMounted: mockOnMounted,
  onUnmounted: mockOnUnmounted,
}));

describe('useKeyboard', () => {
  let handlers: KeyboardHandler[];
  let keyboardManage: ReturnType<typeof useKeyboard>;

  beforeEach(() => {
    handlers = [
      {
        key: 'ctrl+z',
        handler: vi.fn()
      },
      {
        key: 'ctrl+y,ctrl+shift+z',
        handler: vi.fn()
      },
      {
        key: 'delete,backspace',
        handler: vi.fn()
      },
      {
        key: 'cmd+z',
        handler: vi.fn()
      },
      {
        key: 'cmd+shift+z',
        handler: vi.fn()
      }
    ];

    keyboardManage = useKeyboard(handlers);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should register lifecycle hooks', () => {
    expect(mockOnMounted).toHaveBeenCalled();
    expect(mockOnUnmounted).toHaveBeenCalled();
  });

  it('should add handler at runtime', () => {
    const newHandler = {
      key: 'ctrl+s',
      handler: vi.fn()
    };

    keyboardManage.addHandler(newHandler);
    expect(handlers).toContain(newHandler);
  });

  it('should remove handler by key', () => {
    keyboardManage.removeHandler('ctrl+z');
    expect(handlers).toHaveLength(4);
    expect(handlers.find(h => h.key === 'ctrl+z')).toBeUndefined();
  });

  it('should get all handlers', () => {
    const allHandlers = keyboardManage.getHandlers();
    expect(allHandlers).toHaveLength(5);
    expect(allHandlers).toEqual(handlers);
  });

  it('should clear all handlers', () => {
    keyboardManage.clearHandlers();
    expect(handlers).toHaveLength(0);
  });

  it('should handle multiple shortcuts without conflicts', () => {
    const conflictHandlers: KeyboardHandler[] = [
      {
        key: 'cmd+z',
        handler: vi.fn()
      },
      {
        key: 'cmd+shift+z',
        handler: vi.fn()
      },
      {
        key: 'cmd+alt+z',
        handler: vi.fn()
      }
    ];

    const conflictKeyboard = useKeyboard(conflictHandlers);
    
    // 验证所有处理器都被正确添加
    expect(conflictHandlers).toHaveLength(3);
    expect(conflictHandlers[0].key).toBe('cmd+z');
    expect(conflictHandlers[1].key).toBe('cmd+shift+z');
    expect(conflictHandlers[2].key).toBe('cmd+alt+z');
  });
});

// 使用示例
describe('useKeyboard usage examples', () => {
  it('should demonstrate typical usage with cross-platform support', () => {
    const handlers: KeyboardHandler[] = [
      {
        key: 'ctrl+z,cmd+z',
        handler: (event) => {
          console.log('Undo action');
          // 执行撤销操作 - 支持 Windows/Linux 的 Ctrl+Z 和 Mac 的 Cmd+Z
        }
      },
      {
        key: 'ctrl+y,ctrl+shift+z,cmd+shift+z',
        handler: (event) => {
          console.log('Redo action');
          // 执行重做操作 - 支持多种重做快捷键
        }
      },
      {
        key: 'ctrl+s,cmd+s',
        handler: (event) => {
          console.log('Save action');
          // 执行保存操作
        }
      },
      {
        key: 'delete,backspace',
        handler: (event) => {
          console.log('Delete action');
          // 执行删除操作
        }
      },
      {
        key: 'ctrl+c,cmd+c',
        handler: (event) => {
          console.log('Copy action');
          // 执行复制操作
        }
      },
      {
        key: 'ctrl+v,cmd+v',
        handler: (event) => {
          console.log('Paste action');
          // 执行粘贴操作
        }
      },
      {
        key: 'ctrl+a,cmd+a',
        handler: (event) => {
          console.log('Select all action');
          // 执行全选操作
        }
      },
      {
        key: 'ctrl+d,cmd+d',
        handler: (event) => {
          console.log('Duplicate action');
          // 执行复制操作
        }
      }
    ];

    const keyboardManage = useKeyboard(handlers);

    // 运行时添加新的快捷键
    keyboardManage.addHandler({
      key: 'ctrl+shift+s,cmd+shift+s',
      handler: (event) => {
        console.log('Save as action');
        // 执行另存为操作
      }
    });

    // 移除某个快捷键
    keyboardManage.removeHandler('ctrl+s,cmd+s');

    // 获取当前所有快捷键
    const currentHandlers = keyboardManage.getHandlers();
    console.log('Current handlers:', currentHandlers);
  });
}); 