import { ref } from "vue";
import { ref as cRef, Ref as ICRef } from "@cgx-designer/reactivity";
import { ElementManage } from "./useElement";

export type SourceDataManage = ReturnType<typeof useSourceData>;

//TODO 暂时实现ref和reactive
//vue的数据源目前应该是三种 ref reactive 和 普通的请求数据源
export type SourceDataType = "ref" | "reactive" | "http";

export interface SourceDataItem {
  type: SourceDataType;
  name: string;
  instance: ICRef;
}

export const useSourceData = (elementManage: ElementManage) => {
  const sourceData = ref<SourceDataItem[]>([]);

  const setSourceData = (target: SourceDataItem[]) => {
    sourceData.value = target;
    sourceData.value = sourceData.value.map((sourceDataItem) => {
      const target = cRef(
        sourceDataItem.instance.initialValue,
        sourceDataItem.instance.deps
      );
      target.init(elementManage.getElementInstanceById);
      return {
        ...sourceDataItem,
        instance: target,
      };
    });
  };

  const addSourceData = (
    type: SourceDataType,
    name: string,
    initialValue: any
  ) => {
    const instance = cRef(initialValue);
    sourceData.value.push({
      type,
      name,
      instance,
    });
  };

  //todo 记得删除
  addSourceData("ref", "test", "测试哈哈哈");

  const removeSourceData = (name: string) => {
    sourceData.value = sourceData.value.filter((item) => item.name !== name);
  };

  const getSourceData = (name: string) => {
    const item = sourceData.value.find((item) => item.name === name);
    if (item) {
      return item;
    } else {
      throw new Error(`数据源 ${name} not found`);
    }
  };

  const setSourceDataItem = (name: string, value: any) => {
    //先找到对应的实例
    const sourceDataItem = sourceData.value.find((item) => item.name === name);
    if (sourceDataItem) {
      // 我们的响应式会自己触发回调
      sourceDataItem.instance.value = value;
    } else {
      throw new Error(`数据源 ${name} not found`);
    }
  };

  return {
    sourceData,
    addSourceData,
    removeSourceData,
    getSourceData,
    setSourceData,
    setSourceDataItem,
  };
};
