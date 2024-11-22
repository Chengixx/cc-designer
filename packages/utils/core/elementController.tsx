import { defineAsyncComponent } from "vue";
import { template } from "@cgx-designer/ui";
import { IElementBaseSetting } from "../types/index";
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
  register = (element: IElementBaseSetting) => {
    if (!element.noPushList) {
      this.elementList.push(element);
    }
    this.elementMap[element.key] = element;
    this.elementTemplate[element.key] = element.template;
    this.elementRenderMap[element.key] = defineAsyncComponent(element.render);
  };
  registerCustomElement = (key: string, element: any) => {
    this.elementRenderMap[key] = element;
  };
}

//提供一个实例
export let elementController = new ElementController();

//注册模板
(function () {
  for (let key in template) {
    elementController.register(template[key]);
  }
  console.log("元素配置菜单注册完成", elementController);
})();
