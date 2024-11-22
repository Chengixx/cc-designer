import { events } from "@cgx-designer/utils";
import { onMounted, onUnmounted, reactive } from "vue";
import { ElNotification } from "element-plus";
import { FocusManage } from "./useFocus";
import { ElementManage } from "./useElement";
import { cloneDeep } from "lodash";
import { IEditorElement } from "@cgx-designer/core";

export interface ICommand {
  name: string;
  keyboard?: string;
  execute: Function;
  init?: Function;
  before?: any;
  //是否要放到队列里
  pushQueue?: boolean;
}

export type Queue = {
  redo: Function;
  undo: Function;
};

export interface ICommandState {
  current: number;
  queue: Array<Queue>;
  commands: Record<string, Function>;
  commandArray: ICommand[];
  destroyArray: Function[];
}

export const useCommand = (
  elementManage: ElementManage,
  focusManage: FocusManage
) => {
  const state: ICommandState = reactive({
    current: -1, //索引
    queue: [], //命令
    commands: {}, //老样子 印射表
    commandArray: [], //存放
    destroyArray: [],
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
    };
  };

  onMounted(() => {
    registry({
      name: "redo",
      keyboard: "ctrl+y",
      execute() {
        return {
          redo() {
            let item = state.queue[state.current + 1];
            if (item) {
              item.redo && item.redo();
              state.current++;
              ElNotification.success("重做成功！");
              focusManage.resetFocus();
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
            //一开始不能撤销，就空的就不能撤销了
            if (state.current == -1) {
              return ElNotification.warning("已经是最前面啦！");
            }
            let item = state.queue[state.current];
            if (item) {
              item.undo && item.undo();
              state.current--;
              ElNotification.success("撤销成功！");
              focusManage.resetFocus();
            }
          },
        };
      },
    });
    //Todo深拷贝影响绑定了 但是不深拷贝无法回退等。。。
    //拖拽的事件
    registry({
      name: "drag",
      pushQueue: true,
      before: null,
      init() {
        this.before = null;
        //开始的回调函数
        const start = () => {
          this.before = cloneDeep(elementManage.elementList.value);
          // this.before = elementManage.elementList.value;
        };
        //结束的回调函数
        const end = () => {
          state.commands.drag();
        };
        events.on("start", start);
        events.on("end", end);

        return () => {
          events.off("start", start);
          events.off("end", end);
        };
      },
      execute() {
        let before = this.before;
        let after = elementManage.elementList.value;
        return {
          redo() {
            //默认的
            //要深拷贝一份 因为是响应式的 妈的一直更新,我服了操阿草草草草草草
            elementManage.setElementList(cloneDeep(after));
            // elementManage.setElementList(after);
          },
          undo() {
            //前一次的
            elementManage.setElementList(before);
          },
        };
      },
    });
    //导入
    registry({
      name: "handleImport",
      pushQueue: true,
      execute(newValue: IEditorElement[]) {
        let before = cloneDeep(elementManage.elementList.value);
        let after = newValue;
        return {
          redo: () => {
            elementManage.setElementList(after);
          },
          undo: () => {
            elementManage.setElementList(before);
          },
        };
      },
    });
    //往最后面加一个
    registry({
      name: "handleLastAdd",
      pushQueue: true,
      execute(newElementSchema: IEditorElement) {
        let before = cloneDeep(elementManage.elementList.value);
        let after = elementManage.addElementFromLast(newElementSchema);
        return {
          redo: () => {
            elementManage.setElementList(cloneDeep(after)!);
            focusManage.handleFocus(
              elementManage.findElementById(newElementSchema.id!)!
            );
          },
          undo: () => {
            elementManage.setElementList(before);
          },
        };
      },
    });
    //删除
    registry({
      name: "handleDelete",
      pushQueue: true,
      execute() {
        let before = cloneDeep(elementManage.elementList.value);
        let after = elementManage.deleteElementById(
          focusManage.focusedElement.value!.id!
        );
        return {
          redo: () => {
            focusManage.resetFocus();
            elementManage.setElementList(cloneDeep(after!));
          },
          undo: () => {
            elementManage.setElementList(before);
          },
        };
      },
    });
    //删除全部 清空
    registry({
      name: "handleClear",
      pushQueue: true,
      execute() {
        let before = cloneDeep(elementManage.elementList.value);
        let after = elementManage.deleteAllElements();
        return {
          redo: () => {
            focusManage.resetFocus();
            elementManage.setElementList(after!);
          },
          undo: () => {
            elementManage.setElementList(before);
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
          let keyString: Array<string> | string = [];
          if (ctrlKey) keyString.push("ctrl");
          keyString.push(keyCodes[code]);
          keyString = keyString.join("+");
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
      state.destroyArray.push(keyboardEvent());
      state.commandArray.forEach(
        (command) => command.init && state.destroyArray.push(command.init())
      );
    })();
  });

  onUnmounted(() => {
    //最后也是要清除
    state.destroyArray.forEach((cb) => {
      cb && cb();
    });
  });
  return state;
};
