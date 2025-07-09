import { ref } from "vue";
import { createRef, IDependencyEvent } from "@cgx-designer/reactivity";
import { ElementManage } from "./useElement";
import { setValueByPath } from "@cgx-designer/utils";

export type SourceDataManage = ReturnType<typeof useSourceData>;

// 数据源类型
export type SourceDataType = "ref" | "http";

// 数据源项接口
export interface SourceDataItem {
  type: SourceDataType;
  name: string;
  instance: any; // 使用 any 类型避免私有属性问题
}

// 数据源管理器
class SourceDataManager {
  private sourceData = ref<SourceDataItem[]>([]);
  private elementManage: ElementManage;

  constructor(elementManage: ElementManage) {
    this.elementManage = elementManage;
  }

  // 获取所有数据源
  getAll(): SourceDataItem[] {
    return this.sourceData.value;
  }

  // 根据名称查找数据源
  findByName(name: string): SourceDataItem | undefined {
    return this.sourceData.value.find((item) => item.name === name);
  }

  // 根据名称获取数据源（带错误处理）
  getByName(name: string): SourceDataItem {
    const item = this.findByName(name);
    if (!item) {
      throw new Error(`数据源 ${name} not found`);
    }
    return item;
  }

  // 添加数据源
  add(type: SourceDataType, name: string, initialValue: any): void {
    const instance = createRef(initialValue);
    instance.init(this.elementManage.getElementInstanceById);

    this.sourceData.value.push({
      type,
      name,
      instance,
    });
  }

  // 更新数据源
  update(index: number, name: string, newValue: any): void {
    if (index < 0 || index >= this.sourceData.value.length) {
      throw new Error(`数据源索引 ${index} 超出范围`);
    }

    const sourceDataItem = this.sourceData.value[index];
    sourceDataItem.instance.value = newValue;
    sourceDataItem.name = name;

    // 更新所有依赖该数据源的组件
    this.updateDependencies(sourceDataItem);
  }

  // 删除数据源
  remove(name: string): void {
    const sourceDataItem = this.findByName(name);
    if (!sourceDataItem) return;

    // 清理所有依赖
    this.cleanupDependencies(sourceDataItem);

    // 从列表中移除
    this.sourceData.value = this.sourceData.value.filter(
      (item) => item.name !== name
    );
  }

  // 设置数据源值
  setValue(name: string, value: any): void {
    const sourceDataItem = this.getByName(name);
    sourceDataItem.instance.value = value;
  }

  // 批量设置数据源
  setAll(sourceDataItems: SourceDataItem[]): void {
    this.sourceData.value = sourceDataItems.map((item) => {
      const instance = createRef(
        item.instance.getValue(),
        item.instance.getDependencies()
      );
      instance.init(this.elementManage.getElementInstanceById);

      return {
        ...item,
        instance,
      };
    });
  }

  // 移除特定组件的依赖
  removeComponentDependencies(
    sourceDataName: string,
    componentId: string
  ): void {
    const sourceDataItem = this.findByName(sourceDataName);
    if (!sourceDataItem) return;

    const currentDeps = sourceDataItem.instance.getDependencies();
    const filteredDeps = currentDeps.filter(
      (dep) => dep.componentId !== componentId
    );

    sourceDataItem.instance.clearDependencies();
    sourceDataItem.instance.addDependencies(filteredDeps);
  }

  // 添加组件依赖
  addComponentDependency(
    sourceDataName: string,
    dependency: IDependencyEvent
  ): void {
    const sourceDataItem = this.getByName(sourceDataName);
    sourceDataItem.instance.addDependency(dependency);
  }

  // 私有方法：更新依赖
  private updateDependencies(sourceDataItem: SourceDataItem): void {
    sourceDataItem.instance.getDependencies().forEach((dep) => {
      const elementSchema = this.elementManage.getElementById(dep.componentId);
      if (!elementSchema) return;

      // 更新组件属性值
      const bindData = {
        type: "sourceData",
        dataType: sourceDataItem.type,
        value: sourceDataItem.name,
      };

      setValueByPath(elementSchema, dep.attrName, bindData);
    });
  }

  // 私有方法：清理依赖
  private cleanupDependencies(sourceDataItem: SourceDataItem): void {
    sourceDataItem.instance.getDependencies().forEach((dep) => {
      const elementSchema = this.elementManage.getElementById(dep.componentId);
      if (!elementSchema) return;

      // 清理组件属性值
      if (dep.attrName.startsWith("props.")) {
        const propName = dep.attrName.slice(6);
        if (elementSchema.props) {
          elementSchema.props[propName] = undefined;
        }
      } else {
        setValueByPath(elementSchema, dep.attrName, undefined);
      }
    });
  }

  // 获取响应式数据
  get reactiveData() {
    return this.sourceData;
  }

  // 获取数据源数量
  get count(): number {
    return this.sourceData.value.length;
  }

  // 检查是否存在指定名称的数据源
  has(name: string): boolean {
    return this.findByName(name) !== undefined;
  }
}

export const useSourceData = (elementManage: ElementManage) => {
  const manager = new SourceDataManager(elementManage);

  // 添加一些默认的测试数据（开发环境）
  manager.add("ref", "test", "测试哈哈哈");
  manager.add("ref", "test1", "测试11111");

  return {
    // 响应式数据
    sourceData: manager.reactiveData,

    // 核心方法
    addSourceData: manager.add.bind(manager),
    editSourceData: manager.update.bind(manager),
    removeSourceData: manager.remove.bind(manager),
    getSourceData: manager.getByName.bind(manager),
    setSourceData: manager.setAll.bind(manager),
    setSourceDataItem: manager.setValue.bind(manager),
    removeSourceDataDepByComponentId:
      manager.removeComponentDependencies.bind(manager),

    // 新增的便捷方法
    addComponentDependency: manager.addComponentDependency.bind(manager),
    hasSourceData: manager.has.bind(manager),
    getSourceDataCount: () => manager.count,

    // 批量操作
    clearAll: () => manager.setAll([]),
    getSourceDataNames: () => manager.getAll().map((item) => item.name),
  };
};
