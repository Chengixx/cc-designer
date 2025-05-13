//需要手动收集依赖 因为这边的用途是用于数据源设计器 并不是组件本身
import { ElementInstance } from "@cgx-designer/types";

export interface IRefEvent {
  // 事件的唯一标识
  key: string;
  // Todo事件的类型 现在应该就是只有组件
  type: string;
  componentId: string;
  //属性名称
  attrName: string;
}

//绑定以后的schema上的值
export interface IBindSourceData {
  type: "sourceData";
  dataType: string;
  value: string;
}

export class Ref {
  //初始值
  initialValue: any;
  find: ((id: string) => ElementInstance | undefined) | undefined = undefined;
  deps: Array<IRefEvent> = [];

  constructor(initialValue: any, deps?: Array<IRefEvent>) {
    this.initialValue = initialValue;
    if (deps) {
      this.deps = deps;
    }
  }

  get value() {
    return this.initialValue;
  }

  set value(newValue: any) {
    // 减少开销 值没有变化的情况下不触发
    if (newValue === this.initialValue) return;
    this.initialValue = newValue;
    this.deps.forEach((fn) => {
      if (fn.attrName === "props.defaultValue") {
        this.find!(fn.componentId)?.setValue!(newValue);
      } else {
        this.find!(fn.componentId)?.setAttr!(
          fn.attrName.startsWith("props.") ? fn.attrName.slice(6) : fn.attrName,
          newValue
        );
      }
    });
  }

  init(event: (id: string) => ElementInstance | undefined) {
    this.find = event;
  }

  addDeps(fn: IRefEvent) {
    this.deps.push(fn);
  }

  removeDeps(name: string) {
    this.deps = this.deps.filter((item) => item.key !== name);
  }

  clearDeps() {
    this.deps = [];
  }

  getDeps() {
    return this.deps;
  }
}

export function ref(initialValue: any, deps?: Array<IRefEvent>) {
  return deps ? new Ref(initialValue, deps) : new Ref(initialValue);
}
