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
  instance: any;
}

export const useSourceData = (elementManage: ElementManage) => {
  const sourceData = ref<SourceDataItem[]>([]);

  // 工具函数：查找数据源
  const findSourceData = (name: string) =>
    sourceData.value.find((item) => item.name === name);

  // 工具函数：获取数据源（带错误处理）
  const getSourceDataByName = (name: string) => {
    const item = findSourceData(name);
    if (!item) {
      throw new Error(`数据源 ${name} not found`);
    }
    return item;
  };

  // 工具函数：更新依赖
  const updateDependencies = (sourceDataItem: SourceDataItem) => {
    sourceDataItem.instance.getDependencies().forEach((dep) => {
      const elementSchema = elementManage.getElementById(dep.componentId);
      if (!elementSchema) return;

      const bindData = {
        type: "sourceData",
        dataType: sourceDataItem.type,
        value: sourceDataItem.name,
      };

      setValueByPath(elementSchema, dep.attrName, bindData);
    });
  };

  // 工具函数：清理依赖
  const cleanupDependencies = (sourceDataItem: SourceDataItem) => {
    sourceDataItem.instance.getDependencies().forEach((dep) => {
      const elementSchema = elementManage.getElementById(dep.componentId);
      if (!elementSchema) return;

      if (dep.attrName.startsWith("props.")) {
        const propName = dep.attrName.slice(6);
        if (elementSchema.props) {
          elementSchema.props[propName] = undefined;
        }
      } else {
        setValueByPath(elementSchema, dep.attrName, undefined);
      }
    });
  };

  // 核心方法
  const addSourceData = (
    type: SourceDataType,
    name: string,
    initialValue: any
  ) => {
    const instance = createRef(initialValue);
    instance.init(elementManage.getElementInstanceById);

    sourceData.value.push({ type, name, instance });
  };

  const editSourceData = (index: number, name: string, newValue: any) => {
    if (index < 0 || index >= sourceData.value.length) {
      throw new Error(`数据源索引 ${index} 超出范围`);
    }

    const sourceDataItem = sourceData.value[index];
    sourceDataItem.instance.value = newValue;
    sourceDataItem.name = name;

    updateDependencies(sourceDataItem);
  };

  const removeSourceData = (name: string) => {
    const sourceDataItem = findSourceData(name);
    if (!sourceDataItem) return;

    cleanupDependencies(sourceDataItem);
    sourceData.value = sourceData.value.filter((item) => item.name !== name);
  };

  const getSourceData = (name: string) => getSourceDataByName(name);

  const setSourceData = (target: SourceDataItem[]) => {
    sourceData.value = target.map((item) => {
      const instance = createRef(
        item.instance.getValue(),
        item.instance.getDependencies()
      );
      instance.init(elementManage.getElementInstanceById);

      return { ...item, instance };
    });
  };

  const setSourceDataItem = (name: string, value: any) => {
    const sourceDataItem = getSourceDataByName(name);
    sourceDataItem.instance.value = value;
  };

  const removeSourceDataDepByComponentId = (
    sourceDataName: string,
    componentId: string
  ) => {
    const sourceDataItem = findSourceData(sourceDataName);
    if (!sourceDataItem) return;

    const currentDeps = sourceDataItem.instance.getDependencies();
    const filteredDeps = currentDeps.filter(
      (dep) => dep.componentId !== componentId
    );

    sourceDataItem.instance.clearDependencies();
    sourceDataItem.instance.addDependencies(filteredDeps);
  };

  // 便捷方法
  const addComponentDependency = (
    sourceDataName: string,
    dependency: IDependencyEvent
  ) => {
    const sourceDataItem = getSourceDataByName(sourceDataName);
    sourceDataItem.instance.addDependency(dependency);
  };

  const hasSourceData = (name: string) => findSourceData(name) !== undefined;

  const getSourceDataCount = () => sourceData.value.length;

  const clearAll = () => setSourceData([]);

  const getSourceDataNames = () => sourceData.value.map((item) => item.name);

  // 添加测试数据
  addSourceData("ref", "test", "测试哈哈哈");
  addSourceData("ref", "test1", "测试11111");

  return {
    sourceData,
    addSourceData,
    editSourceData,
    removeSourceData,
    getSourceData,
    setSourceData,
    setSourceDataItem,
    removeSourceDataDepByComponentId,
    addComponentDependency,
    hasSourceData,
    getSourceDataCount,
    clearAll,
    getSourceDataNames,
  };
};
