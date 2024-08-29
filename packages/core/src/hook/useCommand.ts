import { events } from "@/config/events";
import { IEditorElement, useElementStoreHook } from "@/store/modules/element";
import { deepClone } from "@/utils";
import { onMounted, onUnmounted, reactive } from "vue";
import { ElNotification } from "element-plus";
import useFocus from "./useFocus";
import { IElementBaseSetting } from "@/config/elementCreator";
interface ICommand {
  name: string;
  keyboard?: string;
  execute: Function;
  init?: Function;
  before?: any;
  //是否要放到队列里
  pushQueue?: boolean;
}

type Queue = {
  redo: Function;
  undo: Function;
};

interface ICommandState {
  current: number;
  queue: Array<Queue>;
  commands: Record<string, Function>;
  commandArray: ICommand[];
  destoryArray: Function[];
}

const useCommand = () => {
  const { getFocusElement, resetAllElementsUnFocus } = useFocus();
  const { setElementList, deleteElementById, addColForRow, deleteAllElements } =
    useElementStoreHook();
  const state: ICommandState = reactive({
    current: -1, //索引
    queue: [], //命令
    commands: {}, //老样子 印射表
    commandArray: [], //存放
    destoryArray: [],
  });
  const registry = (command: ICommand) => {
    state.commandArray.push(command);
    state.commands[command.name] = (...args: any[]) => {
      const { redo, undo } = command.execute(...args);
      redo();
      if (!command.pushQueue) {
        return;
      }
      let { queue, current } = state;

      if (queue.length > 0) {
        queue = queue.slice(0, current + 1);
        state.queue = queue;
      }
      queue.push({ redo, undo });
      state.current = current + 1;
      // console.log("🍉", state.queue);
    };
  };

  onMounted(() => {
    registry({
      name: "redo",
      keyboard: "ctrl+y",
      execute() {
        return {
          redo() {
            // console.log("重做");
            let item = state.queue[state.current + 1];
            // console.log(state.current + 1);
            if (item) {
              item.redo && item.redo();
              state.current++;
              ElNotification.success("重做成功！");
              resetAllElementsUnFocus();
            } else {
              ElNotification.warning("已经是最后面啦！");
            }
          },
        };
      },
    });
    registry({
      name: "undo",
      keyboard: "ctrl+z",
      execute() {
        return {
          redo() {
            // console.log("撤销");
            //一开始不能撤销，就空的就不能撤销了
            if (state.current == -1) {
              return ElNotification.warning("已经是最前面啦！");
            }
            let item = state.queue[state.current];
            if (item) {
              item.undo && item.undo();
              state.current--;
              ElNotification.success("撤销成功！");
              resetAllElementsUnFocus();
            }
          },
        };
      },
    });
    //拖拽的事件
    registry({
      name: "drag",
      pushQueue: true,
      before: null,
      init() {
        this.before = null;
        const start = () =>
          (this.before = deepClone(useElementStoreHook().elementList));
        const end = () => state.commands.drag();
        events.on("start", start);
        events.on("end", end);

        return () => {
          events.off("start", start);
          events.off("end", end);
        };
      },
      execute() {
        let before = this.before;
        let after = useElementStoreHook().elementList;
        // console.log("before", before);
        // console.log("after", after);
        return {
          redo() {
            //默认的
            // console.log("重做会触发这个事件", after);
            //要深拷贝一份 因为是响应式的 妈的一直更新,我服了操阿草草草草草草
            setElementList(deepClone(after));
          },
          undo() {
            //前一次的
            // console.log("撤销会触发这个事件", before);
            setElementList(before);
          },
        };
      },
    });
    //导入
    registry({
      name: "import",
      pushQueue: true,
      execute(newValue: IEditorElement[]) {
        let before = deepClone(useElementStoreHook().elementList);
        let after = newValue;
        return {
          redo: () => {
            setElementList(after);
          },
          undo: () => {
            setElementList(before);
          },
        };
      },
    });
    //往最后面加一个
    registry({
      name: "addFromLast",
      pushQueue: true,
      execute(element: IElementBaseSetting) {
        let before = deepClone(useElementStoreHook().elementList);
        let after = useElementStoreHook().addElementFromLast(element);
        return {
          redo: () => {
            setElementList(deepClone(after));
          },
          undo: () => {
            setElementList(before);
          },
        };
      },
    });
    //往一个row里加col
    registry({
      name: "addColForRow",
      pushQueue: true,
      execute() {
        let before = deepClone(useElementStoreHook().elementList);
        let after = addColForRow();
        return {
          redo: () => {
            setElementList(deepClone(after!));
          },
          undo: () => {
            setElementList(before);
          },
        };
      },
    });
    //删除
    registry({
      name: "delete",
      pushQueue: true,
      execute() {
        let before = deepClone(useElementStoreHook().elementList);
        let after = deleteElementById(getFocusElement()!.id);
        return {
          redo: () => {
            setElementList(deepClone(after!));
          },
          undo: () => {
            setElementList(before);
          },
        };
      },
    });
    //删除全部 清空
    registry({
      name: "clear",
      pushQueue: true,
      execute() {
        let before = deepClone(useElementStoreHook().elementList);
        let after = deleteAllElements();
        return {
          redo: () => {
            setElementList(after!);
          },
          undo: () => {
            setElementList(before);
          },
        };
      },
    });

    const keyboardEvent = (() => {
      const init = () => {
        const keyCodes: Record<string, string> = {
          KeyZ: "z",
          KeyY: "y",
        };
        const onKeydown = (e: KeyboardEvent) => {
          const { ctrlKey, code } = e;
          // console.log("没触发吗", code);
          let keyString: Array<string> | string = [];
          if (ctrlKey) keyString.push("ctrl");
          keyString.push(keyCodes[code]);
          keyString = keyString.join("+");
          // console.log(keyString);
          state.commandArray.forEach(({ keyboard, name }) => {
            if (!keyboard) return;
            if (keyboard === keyString) {
              state.commands[name]();
              e.preventDefault();
            }
          });
        };
        window.addEventListener("keydown", onKeydown);
        return () => {
          //销毁用的
          window.removeEventListener("keydown", onKeydown);
        };
      };
      console.log("mitt事件队列注册完成", state);
      return init;
    })();

    (() => {
      state.destoryArray.push(keyboardEvent());
      state.commandArray.forEach(
        (command) => command.init && state.destoryArray.push(command.init())
      );
    })();
  });

  onUnmounted(() => {
    //最后也是要清除
    state.destoryArray.forEach((cb) => {
      cb && cb();
    });
  });
  return state;
};

export default useCommand;
