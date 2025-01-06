import { defineAsyncComponent, ref } from "vue";
import { elementPlusPlugin, vuetifyPlugin } from "@cgx-designer/materials";
import { IElementBaseSetting } from "../types/index";
import { getRandomId } from "@cgx-designer/utils";
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
  elementLibrary: ElementLib | null = null;
  //初始的模板，初始的schema
  elementTemplate: Record<string, (uuid: Function) => IEditorElement> = {};
  //能用的是哪些,用于渲染左侧物料列表
  elementList: IElementBaseSetting[] = [];
  //根据key去做能用的是哪些
  elementConfigMap: Record<string, IElementBaseSetting> = {};
  //用于渲染的map
  elementRenderMap: Record<string, any> = {};
  //总的install(这个主要是实际生产用的时候注册插件
  install = (elementPlugin: ElementPlugin) => {
    const { name, template } = elementPlugin;
    for (let key in template) {
      elementController.register(template[key]);
    }
    //所有组件都安装完毕之后，设置控制器告诉它当前使用的组件库
    this.elementLibrary = name;
    this.isReady.value = true;
  };
  //注册元素到左侧菜单栏，必须走这里过
  register = (elementBaseConfig: IElementBaseSetting) => {
    if (!elementBaseConfig.noPushList) {
      //这个方法不抽 因为需要注册到list 必须有下面的方法 只会在这里用到
      this.elementList.push(elementBaseConfig);
    }
    this.registerElementTemplate(
      elementBaseConfig.key,
      elementBaseConfig.template
    );
    this.registerElementRenderMap(
      elementBaseConfig.key,
      elementBaseConfig.render
    );

    this.addElementBaseConfigExtraContent(elementBaseConfig);
    this.registerElementConfigMap(elementBaseConfig);
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
    return this.elementRenderMap[key];
  };
}

//提供一个实例
export const elementController = new ElementController();

//开发环境测试用
elementController.install(vuetifyPlugin);
