import { ref } from "vue";

export interface GlobalFunction {
  key: string;
  tip?: string;
  name: string;
  callback: (...args: any[]) => any;
}

export class FunctionController {
  functionMap = ref<Record<string, GlobalFunction>>({
    test: {
      key: "test",
      name: "测试",
      callback: () => {
        console.log("test");
      },
      tip: "测试",
    },
  });

  registerFunction = (functionPrototype: GlobalFunction) => {
    this.functionMap.value[functionPrototype.key] = functionPrototype;
  };

  removeFunction = (key: string) => {
    delete this.functionMap.value[key];
  };
}

const functionController = new FunctionController();

export default functionController;
