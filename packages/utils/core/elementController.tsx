import { defineAsyncComponent } from "vue";
import { template } from "@cgx-designer/ui";
import { IElementBaseSetting } from "../types/index";
import { getRandomId } from "../common/index";
//创建组件基础配置的东西

export class ElementController {
  //初始的模板，初始的schema
  elementTemplate: Record<string, any> = {};
  //能用的是哪些
  elementList: IElementBaseSetting[] = [];
  //根据key去做能用的是哪些
  elementMap: Record<string, IElementBaseSetting> = {};
  //用于渲染的map
  elementRenderMap: Record<string, any> = {};
  register = (elementBaseConfig: IElementBaseSetting) => {
    if (!elementBaseConfig.noPushList) {
      this.elementList.push(elementBaseConfig);
    }
    this.elementTemplate[elementBaseConfig.key] = elementBaseConfig.template;
    this.elementRenderMap[elementBaseConfig.key] =
      typeof elementBaseConfig.render === "function"
        ? defineAsyncComponent(elementBaseConfig.render)
        : elementBaseConfig.render;

    if (elementBaseConfig.template(getRandomId).formItem) {
      (elementBaseConfig.config!.action ??= []).unshift(
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
    this.elementMap[elementBaseConfig.key] = elementBaseConfig;
  };
  registerCustomElement = (key: string, element: any) => {
    this.elementRenderMap[key] = element;
  };
}

//提供一个实例
export const elementController = new ElementController();

//注册模板
(function () {
  for (let key in template) {
    elementController.register(template[key]);
  }
  console.log("元素配置菜单注册完成", elementController);
})();
