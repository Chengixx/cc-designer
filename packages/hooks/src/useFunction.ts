import { ref, watchEffect } from "vue";
import { ElementManage } from "./useElement";
import { ElementInstance, EventInstance } from "@cgx-designer/core";
import { ElMessage, ElMessageBox } from "element-plus";

//默认js
export let defaultJs = `
      const removeAllFocus = () => {
          const focusableElements = [
              '[contenteditable]',
              'a[href]',
              'area[href]',
              'button:not([disabled])',
              'input:not([disabled]):not([type="hidden"]):not(.no-focus)',
              'select:not([disabled])',
              'textarea:not([disabled])',
              '[tabindex]:not([tabindex="-1"]):not([disabled])',
              '[contenteditable]'
          ].join(',');
          const allFocusableElements = document.querySelectorAll(focusableElements);
          allFocusableElements.forEach(element => {
              element.blur();
          });
      };

      window.alert = (value) => {
            this.ElMessageBox({
              message: value,
              confirmButtonText: '确定',
              autofocus: false,
              beforeClose: (action, instance, done) => {
                  removeAllFocus();
                  done();
              },
            })
      }
      `;

export type FunctionManage = ReturnType<typeof useFunction>;

//此hook用于挂载函数 并负责调用他们
export const useFunction = (elementManage: ElementManage) => {
  const { getElementInstanceById } = elementManage;
  //让外面输入的script
  const javaScriptVal = ref<string>(
    `
    const { inject , get , ElMessage , ElMessageBox } = this;

    function fn () {
        console.log("i am yours");
        ElMessage.success("i am yours");
    }
    
    const test = () => {
        console.log(this);
        alert("test")
    }

    inject({
      fn,
      test,
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
    //用new Function去创建 但是注意这里一定要立刻执行 否则没用的
    try {
      new Function(defaultJs + js).bind({
        get: getElementInstanceById,
        inject,
        elementManage,
        ElMessage,
        ElMessageBox,
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
  //Todo执行函数
  const executeFunctions = (actions: EventInstance[], ...args: any) => {
    if (!actions || actions.length === 0) {
      console.warn("没有任何方法");
      return;
    }
    actions.forEach((action) => {
      const methodArgs = action.args ? JSON.parse(action.args) : args;
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
