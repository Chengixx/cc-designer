import { defineAsyncComponent } from "vue";
import { template } from "@cgx-designer/ui";
import { IElementBaseSetting } from "../types/index";
import { getRandomId } from "@cgx-designer/utils";
import { IEditorElement } from "@cgx-designer/core";

//创建组件基础配置的东西
export class ElementController {
  //初始的模板，初始的schema
  elementTemplate: Record<string, (uuid: Function) => IEditorElement> = {};
  //能用的是哪些,用于渲染左侧物料列表
  elementList: IElementBaseSetting[] = [];
  //根据key去做能用的是哪些
  elementMap: Record<string, IElementBaseSetting> = {};
  //用于渲染的map
  elementRenderMap: Record<string, any> = {};
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
    this.registerElementMap(elementBaseConfig);
  };
  //注册元素基础config的Map
  registerElementMap = (
    elementBaseConfig: IElementBaseSetting,
    key?: string
  ) => {
    this.elementMap[key ? key : elementBaseConfig.key] = elementBaseConfig;
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
}

//提供一个实例
export const elementController = new ElementController();

//注册提供默认的模板
(function () {
  for (let key in template) {
    elementController.register(template[key]);
  }
  console.log("元素配置菜单注册完成", elementController);
})();
