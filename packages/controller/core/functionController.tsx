import { ref, readonly } from "vue";

export interface GlobalFunction {
  key: string;
  tip?: string;
  name: string;
  callback: (...args: any[]) => any;
}

export class FunctionController {
  private functionMap = ref<Record<string, GlobalFunction>>({
    test: {
      key: "test1",
      name: "测试",
      callback: () => {
        console.log("test");
      },
      tip: "测试",
    },
  });

  // 获取只读的函数映射
  get functions() {
    return readonly(this.functionMap.value);
  }

  // 注册函数
  registerFunction = (functionPrototype: GlobalFunction) => {
    this.functionMap.value[functionPrototype.key] = functionPrototype;
  };

  // 移除函数
  removeFunction = (key: string) => {
    delete this.functionMap.value[key];
  };

  // 获取单个函数
  getFunction = (key: string) => {
    return this.functionMap.value[key];
  };

  // 检查函数是否存在
  hasFunction = (key: string) => {
    return key in this.functionMap.value;
  };

  // 清空所有函数
  clearFunctions = () => {
    this.functionMap.value = {};
  };
}

const functionController = new FunctionController();

export default functionController;
