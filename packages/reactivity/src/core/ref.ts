//需要手动收集依赖 因为这边的用途是用于数据源设计器 并不是组件本身
import { ElementInstance } from "@cgx-designer/types";
import { isEqual } from "lodash-es";

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

export class RefState {
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
    if (isEqual(newValue, this.initialValue)) return;
    this.initialValue = newValue;
    this.updateDependencies(newValue);
  }

  updateDependencies(newValue: any): void {
    for (const dep of this.deps) {
      const instance = this.find?.(dep.componentId);
      if (instance) {
        if (dep.attrName === "props.defaultValue") {
          instance.setValue?.(newValue);
        } else {
          const attrName = dep.attrName.startsWith("props.")
            ? dep.attrName.slice(6)
            : dep.attrName;
          instance.setAttr?.(attrName, newValue);
        }
      }
    }
  }

  public init(event: (id: string) => ElementInstance | undefined) {
    this.find = event;
  }

  public addDeps(fn: IRefEvent) {
    this.deps.push(fn);
  }

  public removeDeps(name: string) {
    this.deps = this.deps.filter((item) => item.key !== name);
  }

  public clearDeps() {
    this.deps = [];
  }

  public getDeps() {
    return this.deps;
  }
}

export function createRef(
  initialValue: any,
  deps?: Array<IRefEvent>
): RefState {
  return deps ? new RefState(initialValue, deps) : new RefState(initialValue);
}
