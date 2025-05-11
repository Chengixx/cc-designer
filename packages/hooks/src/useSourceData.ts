import { Reactive, ref, Ref } from "vue";

export type SoureDataManage = ReturnType<typeof useSourceData>;

//TODO 暂时实现ref和reactive
//vue的数据源目前应该是三种 ref reactive 和 普通的请求数据源
export type SourceDataType = "ref" | "reactive" | "data";

export interface SourceDataItem {
  type: SourceDataType;
  name: string;
  value: any;
  callback: Map<string, Function>;
}

export const useSourceData = () => {
  const sourceData = ref<SourceDataItem[]>([
    {
      type: "ref",
      name: "test",
      value: "我是一个测试的默认值",
      callback: new Map(),
    },
  ]);

  const addSourceData = (item: SourceDataItem) => {
    sourceData.value.push(item);
  };

  const removeSourceData = (name: string) => {
    sourceData.value = sourceData.value.filter((item) => item.name !== name);
  };

  const getSourceData = (name: string) => {
    const item = sourceData.value.find((item) => item.name === name);
    if (item) {
      return item.value;
    } else {
      throw new Error(`数据源 ${name} not found`);
    }
  };

  const setSourceData = (name: string, value: any) => {
    const item = sourceData.value.find((item) => item.name === name);
    if (item) {
      item.value = value;
      // 触发回调
      item.callback.forEach((callback) => {
        callback(value);
      });
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
  };
};
