//需要手动收集依赖 因为这边的用途是用于数据源设计器 并不是组件本身
export class Ref {
  //初始值
  initialValue: any;
  deps: Map<string, Function> = new Map();

  constructor(initialValue: any, deps?: Map<string, Function>) {
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
    this.deps.forEach((fn) => fn(newValue));
  }

  addDeps(fn: Function) {
    this.deps.set(fn.name, fn);
  }

  removeDeps(fn: Function) {
    this.deps.delete(fn.name);
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
