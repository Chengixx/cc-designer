import { IGlobalFunction } from "@cgx-designer/types";
import { ref, readonly } from "vue";

export class FunctionController {
  private functionMap = ref<Record<string, IGlobalFunction>>({
    test: {
      key: "test1",
      name: "测试",
      callback: () => {
        console.log("test");
      },
      tip: "测试",
    },
  });

  get functions() {
    return readonly(this.functionMap.value);
  }

  registerFunction = (functionPrototype: IGlobalFunction) => {
    this.functionMap.value[functionPrototype.key] = functionPrototype;
  };

  removeFunction = (key: string) => {
    delete this.functionMap.value[key];
  };

  getFunction = (key: string) => {
    return this.functionMap.value[key];
  };

  hasFunction = (key: string) => {
    return key in this.functionMap.value;
  };

  clearFunctions = () => {
    this.functionMap.value = {};
  };
}

export const functionController = new FunctionController();
