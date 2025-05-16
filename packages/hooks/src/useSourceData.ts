import { ref } from "vue";
import { createRef, RefState } from "@cgx-designer/reactivity";
import { ElementManage } from "./useElement";
import { getValueByPath } from "@cgx-designer/utils";

export type SourceDataManage = ReturnType<typeof useSourceData>;

//TODO 暂时实现ref 考虑是不是要reactive 但是又感觉没意义 用ref就可以了 其次reactive也会荣誉
//vue的数据源目前应该是两种 ref 和 普通的请求数据源
export type SourceDataType = "ref" | "http";

export interface SourceDataItem {
  type: SourceDataType;
  name: string;
  instance: RefState;
}

export const useSourceData = (elementManage: ElementManage) => {
  const sourceData = ref<SourceDataItem[]>([]);

  const setSourceData = (target: SourceDataItem[]) => {
    sourceData.value = target;
    sourceData.value = sourceData.value.map((sourceDataItem) => {
      const target = createRef(
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
    const instance = createRef(initialValue);
    sourceData.value.push({
      type,
      name,
      instance,
    });
  };

  const editSourceData = (index: number, name: string, initialValue: any) => {
    if (index > -1) {
      const innerSourceData = sourceData.value[index];
      innerSourceData.instance.value = initialValue;
      // 更新名称
      innerSourceData.name = name;
      //这个时候应该把所有的依赖都更新一遍
      innerSourceData.instance.deps.forEach((dep) => {
        //找到每一个schema 然后去更改里面的值
        const elementSchema = elementManage.findElementById(dep.componentId);
        //这里按道理讲不可能为空 除非用户乱改了
        //拿到之后 把value改成新的
        getValueByPath(elementSchema!, dep.attrName).value = name;
      });
    }
  };

  //todo 记得删除
  addSourceData("ref", "test", "测试哈哈哈");

  const removeSourceData = (name: string) => {
    //一样的道理 删除之前 要先清除所用的依赖
    const sourceDataItem = sourceData.value.find((item) => item.name === name);
    if (sourceDataItem) {
      sourceDataItem.instance.deps.forEach((dep) => {
        //找到每一个schema 然后去更改里面的值
        const elementSchema = elementManage.findElementById(dep.componentId);
        //这里按道理讲不可能为空 除非用户乱改了
        //拿到之后 把value改成新的
        if (dep.attrName.startsWith("props.")) {
          elementSchema!.props![dep.attrName.slice(6)] = undefined;
        } else {
          //todo但是这里值得一提的是 我们的引擎里如果默认值改成undefined
          // todo可能渲染器是不会响应的 但是我觉得这个倒是无所谓 仅仅影响画布阶段 并且不会产生实际的影响
          elementSchema![dep.attrName] = undefined;
        }
      });
    }
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
    editSourceData,
    removeSourceData,
    getSourceData,
    setSourceData,
    setSourceDataItem,
  };
};
