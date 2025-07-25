import { computed, ref, watchEffect } from "vue";
import { ElementManage } from "./useElement";
import { ElementInstance, EventInstance } from "@cgx-designer/types";
import {
  elementController,
  functionController,
} from "@cgx-designer/controller";
import { SourceDataManage } from "./useSourceData";

export type FunctionManage = ReturnType<typeof useFunction>;

//此hook用于挂载函数 并负责调用他们
export const useFunction = (
  elementManage: ElementManage,
  sourceDataManage: SourceDataManage
) => {
  const { getElementInstanceById } = elementManage;
  const sourceData = computed(() => {
    //数组转对象 以他的name为key
    return sourceDataManage.sourceData.value.reduce((acc: any, item) => {
      acc[item.name] = item.instance;
      return acc;
    }, {});
  });
  //让外面输入的script
  const javaScriptVal = ref<string>(
    `
    const { inject , get , ElMessage , ElMessageBox } = this;

    function fn () {
        console.log("i am yours");
        ElMessage.success("i am yours");
    }
    
    const testFn = () => {
        console.log(this);
        test.value = "曼巴哈哈哈";
    }

    inject({
      fn,
      testFn,
    })
    `
  );

  //当前已经有的方法列表
  const functionsList = ref<Record<string, Function>>({});

  //外部编写script统一用这个函数
  const setJavaScriptVal = (val: string) => {
    javaScriptVal.value = val;
  };
  //创建函数(script是让外面的人输入的)
  const createFunction = (
    js: string = javaScriptVal.value,
    needShowError: boolean = false
  ) => {
    //在这里之前 我会把我们的响应式数据暴露出去，让用起来就和vue一样
    const sourceDataJs = `const {${Object.keys(sourceData.value).join(",")}} = this;`;
    //用new Function去创建 但是注意这里一定要立刻执行 否则没用的
    const IGlobalFunction: Record<string, () => any> = Object.entries(
      functionController.functions
    ).reduce((acc: any, [key, value]) => {
      acc[key] = value.callback;
      return acc;
    }, {});
    try {
      new Function(sourceDataJs + js).bind({
        ...IGlobalFunction,
        get: getElementInstanceById,
        inject,
        elementManage,
        elementController,
        ...sourceData.value,
      })();
    } catch (e) {
      if (needShowError) {
        console.warn("请检查javaScript是否正确", e);
      }
    }
  };
  //将外面的函数注入进来
  const inject = (fnList?: Record<string, Function> | undefined): void => {
    if (fnList != null) {
      functionsList.value = fnList;
    }
  };
  //执行函数
  const executeFunctions = (actions: EventInstance[], ...args: any) => {
    if (!actions || actions.length === 0) {
      console.warn("没有任何方法");
      return;
    }
    actions.forEach((action) => {
      const methodArgs = action.args ? JSON.parse(action.args) : args;
      //global
      if (action.type === "global") {
        try {
          functionController.functions[action.methodName!]?.callback(...args);
        } catch (err) {
          console.error(`函数(${action.methodName})报错`, err);
        }
      }
      //custom
      if (action.type === "custom") {
        try {
          functionsList.value[action.methodName!]?.(...methodArgs);
        } catch (err) {
          console.error(`函数(${action.methodName})报错`, err);
        }
      }
      //component
      if (action.type === "component") {
        const component =
          action.componentId != null &&
          (elementManage.getElementInstanceById(
            action.componentId
          ) as ElementInstance);

        if (!component) {
          console.warn(`组件${action.componentId}]没有挂载`);
          return;
        }

        try {
          component[action.methodName!](...methodArgs);
        } catch (err) {
          console.error(
            `组件${action.componentId}执行函数(${action.methodName})]报错`,
            err
          );
        }
      }
    });
  };

  watchEffect(() => {
    createFunction();
  });

  return {
    javaScriptVal,
    functionsList,
    setJavaScriptVal,
    createFunction,
    executeFunctions,
  };
};
