//需要手动收集依赖 因为这边的用途是用于数据源设计器 并不是组件本身
import { ElementInstance } from "@cgx-designer/types";

export interface IRefEvent {
  type: string;
  componentId: string;
  attrName: string;
}
export class Ref {
  //初始值
  initialValue: any;
  find: ((id: string) => ElementInstance | undefined) | undefined = undefined;
  deps: Map<string, IRefEvent> = new Map();

  constructor(initialValue: any, deps?: Map<string, IRefEvent>) {
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
      this.find!(fn.componentId)?.setAttr!(
        fn.attrName.startsWith("props.") ? fn.attrName.slice(6) : fn.attrName,
        newValue
      );
    });
  }

  init(event: (id: string) => ElementInstance | undefined) {
    this.find = event;
  }

  addDeps(name: string, fn: IRefEvent) {
    this.deps.set(name, fn);
  }

  removeDeps(name: string) {
    this.deps.delete(name);
  }

  clearDeps() {
    this.deps.clear();
  }

  getDeps() {
    return this.deps;
  }
}

export function ref(initialValue: any) {
  return new Ref(initialValue);
}
