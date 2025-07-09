import { ElementInstance } from "@cgx-designer/types";

// 依赖事件接口
export interface IDependencyEvent {
  key: string;
  type: string;
  componentId: string;
  attrName: string;
}

// 数据源绑定接口
export interface IBindSourceData {
  type: "sourceData";
  dataType: string;
  value: string;
}

// 响应式处理器
type ReactiveHandler = {
  get: (target: any, prop: string | symbol) => any;
  set: (target: any, prop: string | symbol, value: any) => boolean;
};

// 依赖管理器
class DependencyManager {
  private dependencies = new Map<string, IDependencyEvent>();
  private instanceFinder?: (id: string) => ElementInstance | undefined;

  setInstanceFinder(finder: (id: string) => ElementInstance | undefined) {
    this.instanceFinder = finder;
  }

  addDependency(dep: IDependencyEvent): void {
    this.dependencies.set(dep.key, dep);
  }

  removeDependency(key: string): boolean {
    return this.dependencies.delete(key);
  }

  clearDependencies(): void {
    this.dependencies.clear();
  }

  getDependencies(): IDependencyEvent[] {
    return Array.from(this.dependencies.values());
  }

  updateDependencies(newValue: any): void {
    this.dependencies.forEach((dep) => {
      const instance = this.instanceFinder?.(dep.componentId);
      if (!instance) return;

      // 根据属性名决定更新策略
      if (dep.attrName === "props.defaultValue") {
        instance.setValue?.(newValue);
      } else {
        const attrName = dep.attrName.startsWith("props.")
          ? dep.attrName.slice(6)
          : dep.attrName;
        instance.setAttr?.(attrName, newValue);
      }
    });
  }
}

// 创建响应式代理
function createReactiveProxy(
  value: any,
  dependencyManager: DependencyManager
): any {
  // 如果不是对象，直接返回
  if (value === null || typeof value !== "object") {
    return value;
  }

  const handler: ReactiveHandler = {
    get(target, prop) {
      // 特殊属性处理
      if (prop === "__isReactive") return true;
      if (prop === "__dependencyManager") return dependencyManager;

      return target[prop];
    },

    set(target, prop, value) {
      const oldValue = target[prop];
      target[prop] = value;

      // 值变化时触发依赖更新
      if (oldValue !== value) {
        dependencyManager.updateDependencies(value);
      }

      return true;
    },
  };

  return new Proxy(value, handler);
}

// 响应式状态管理
export class RefState {
  private _value: any;
  private _proxy: any;
  private dependencyManager: DependencyManager;

  constructor(initialValue: any, deps?: IDependencyEvent[]) {
    this._value = initialValue;
    this.dependencyManager = new DependencyManager();

    // 创建响应式代理
    this._proxy = createReactiveProxy(this._value, this.dependencyManager);

    if (deps) {
      deps.forEach((dep) => this.dependencyManager.addDependency(dep));
    }
  }

  get value(): any {
    return this._proxy;
  }

  set value(newValue: any) {
    this._value = newValue;
    this._proxy = createReactiveProxy(newValue, this.dependencyManager);
  }

  // 初始化实例查找器
  init(instanceFinder: (id: string) => ElementInstance | undefined): void {
    this.dependencyManager.setInstanceFinder(instanceFinder);
  }

  // 依赖管理
  addDependency(dep: IDependencyEvent): void {
    this.dependencyManager.addDependency(dep);
  }

  removeDependency(key: string): boolean {
    return this.dependencyManager.removeDependency(key);
  }

  clearDependencies(): void {
    this.dependencyManager.clearDependencies();
  }

  getDependencies(): IDependencyEvent[] {
    return this.dependencyManager.getDependencies();
  }

  // 批量操作
  addDependencies(deps: IDependencyEvent[]): void {
    deps.forEach((dep) => this.addDependency(dep));
  }

  removeDependencies(keys: string[]): void {
    keys.forEach((key) => this.removeDependency(key));
  }

  // 工具方法
  getValue(): any {
    return this._value;
  }

  setValueSilently(newValue: any): void {
    this._value = newValue;
    this._proxy = createReactiveProxy(newValue, this.dependencyManager);
  }

  triggerUpdate(): void {
    this.dependencyManager.updateDependencies(this._value);
  }

  hasDependencies(): boolean {
    return this.getDependencies().length > 0;
  }

  getDependencyCount(): number {
    return this.getDependencies().length;
  }
}

// 工厂函数
export function createRef(
  initialValue: any,
  deps?: IDependencyEvent[]
): RefState {
  return new RefState(initialValue, deps);
}

// 工具函数
export function isBindSourceData(value: any): value is IBindSourceData {
  return value && typeof value === "object" && value.type === "sourceData";
}

export function createBindSourceData(
  dataType: string,
  value: string
): IBindSourceData {
  return {
    type: "sourceData",
    dataType,
    value,
  };
}

// 检查是否为响应式对象
export function isReactive(value: any): boolean {
  return value && value.__isReactive === true;
}

// 获取依赖管理器
export function getDependencyManager(
  value: any
): DependencyManager | undefined {
  return isReactive(value) ? value.__dependencyManager : undefined;
}
