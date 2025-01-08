import { defineAsyncComponent, ref } from "vue";
import { elementPlusPlugin, vuetifyPlugin } from "@cgx-designer/materials";
import { IElementBaseSetting } from "../types/index";
import {
  deepClone,
  getRandomId,
  stringFirstSmaller,
} from "@cgx-designer/utils";
import { IEditorElement } from "@cgx-designer/core";

export interface ElementPlugin {
  name: ElementLib;
  template: Record<string, IElementBaseSetting>;
}

export type ElementLib = "element-plus" | "vuetify";
//创建组件基础配置的东西
export class ElementController {
  //是否已经初始化完成
  isReady = ref<boolean>(false);
  //当前使用的是哪个组件库(内部)
  elementLibrary = ref<ElementLib | undefined>(undefined);
  //当前组件库的基础组件(用于删除和缓存)
  libElementKeys: string[] = [];
  //初始的模板，初始的schema
  elementTemplate: Record<string, (uuid: Function) => IEditorElement> = {};
  //能用的是哪些,用于渲染左侧物料列表
  elementList = ref<IElementBaseSetting[]>([]);
  //根据key去做能用的是哪些
  elementConfigMap: Record<string, IElementBaseSetting> = {};
  //用于渲染的map
  elementRenderMap: Record<string, any> = {};
  //总的install(这个主要是实际生产用的时候注册插件
  install = (elementPlugin: ElementPlugin) => {
    const { name, template } = elementPlugin;
    for (let key in template) {
      elementController.register(template[key]);
      this.addLibElementKey(key);
    }
    //所有组件都安装完毕之后，设置控制器告诉它当前使用的组件库
    this.elementLibrary.value = name;
    this.isReady.value = true;
  };
  //清空控制器
  clearController = () => {
    this.elementList.value = [];
    this.elementConfigMap = {};
    this.elementRenderMap = {};
    this.elementTemplate = {};
    this.elementLibrary.value = undefined;
    this.isReady.value = false;
  };
  //清空组件库中的组件
  clearLibElements = () => {
    this.isReady.value = false;
    this.libElementKeys.forEach((key) => {
      // console.log(key, this.elementList.value);
      this.removeComponent(key);
    });
    this.libElementKeys = [];
    console.warn("[lib]:" + this.elementLibrary.value + "删除完毕");
    this.elementLibrary.value = undefined;
  };
  //删除某个组件(Map里去掉)
  removeComponent = (key: string) => {
    delete this.elementConfigMap[key];
    delete this.elementRenderMap[key];
    delete this.elementTemplate[key];
    //删除列表里的
    this.elementList.value = this.elementList.value.filter(
      (element) => element.key !== key
    );
  };
  //获取当前是什么组件库
  getCurrentElementLibrary = () => {
    return this.elementLibrary.value;
  };
  //增加当前组件库的key
  addLibElementKey = (key: string) => {
    this.libElementKeys.push(stringFirstSmaller(key));
  };
  //注册元素到左侧菜单栏，必须走这里过
  register = (elementBaseConfig: IElementBaseSetting) => {
    //此处必须深拷贝 防止每次都修改到原本对象
    const localElementBaseConfig = deepClone(elementBaseConfig);
    if (!localElementBaseConfig.noPushList) {
      //这个方法不抽 因为需要注册到list 必须有下面的方法 只会在这里用到
      this.elementList.value.push(localElementBaseConfig);
    }
    this.registerElementTemplate(
      localElementBaseConfig.key,
      localElementBaseConfig.template
    );
    this.registerElementRenderMap(
      localElementBaseConfig.key,
      localElementBaseConfig.render
    );

    this.addElementBaseConfigExtraContent(localElementBaseConfig);
    this.registerElementConfigMap(localElementBaseConfig);
  };
  //注册元素基础config的Map
  registerElementConfigMap = (
    elementBaseConfig: IElementBaseSetting,
    key?: string
  ) => {
    this.elementConfigMap[key ? key : elementBaseConfig.key] =
      elementBaseConfig;
  };
  //注册元素基础schema
  registerElementTemplate = (
    key: string,
    template: (uuid: Function) => IEditorElement
  ) => {
    this.elementTemplate[key] = template;
  };
  //注册渲染元素列表
  registerElementRenderMap = (key: string, elementRender: any) => {
    this.elementRenderMap[key] =
      typeof elementRender === "function"
        ? defineAsyncComponent(elementRender)
        : elementRender;
  };
  //追加elementBaseConfig内容
  private addElementBaseConfigExtraContent = (
    elementBaseConfig: IElementBaseSetting
  ) => {
    //每个元素都应该有id输入框 用于复制
    ((elementBaseConfig.config ??= {}).attribute ??= []).unshift({
      label: "组件ID",
      key: "idInput",
      field: "id",
      props: {
        readonly: true,
      },
    });

    // 每个有值的元素都可以设置值和获取值
    if (elementBaseConfig.template(getRandomId).formItem) {
      ((elementBaseConfig.config ??= {}).action ??= []).unshift(
        {
          type: "setValue",
          describe: "设置值",
          argsConfigs: [
            {
              field: getRandomId(),
              label: "设置数据",
              ...elementBaseConfig.template(getRandomId),
            },
          ],
        },
        {
          type: "getValue",
          describe: "获取值",
        }
      );
    }
  };
  //获取element渲染
  getElementRender = (key: string) => {
    //兜底 没有的话返回一个空
    return this.elementRenderMap[key] ?? (() => <></>);
  };
  //获取element配置
  getElementConfig = (key: string) => {
    return this.elementConfigMap[key];
  };
}

//提供一个实例
export const elementController = new ElementController();

//开发环境测试用
// elementController.install(vuetifyPlugin);
// elementController.install(elementPlusPlugin);
