import { defineAsyncComponent } from 'vue';
import { template } from "@cgx-designer/ui"
//创建组件基础配置的东西
export interface IElementBaseSetting {
  key: string;
  label: string;
  render: any;
  icon?: string;
  preview?: Function;
  noPushList?: boolean;
  template?: any;
}

export class ElementConfig {
  //初始模板
  elementTemplate: Record<string, any> = {};
  //能用的是哪些
  elementList: IElementBaseSetting[] = [];
  //根据key去做
  elementMap: Record<string, IElementBaseSetting> = {};
  elementRenderMap: Record<string, any> = {};
  register = (element: IElementBaseSetting) => {
    if (!element.noPushList) {
      this.elementList.push(element);
    }
    this.elementMap[element.key] = element;
    this.elementTemplate[element.key] = element.template;
    this.elementRenderMap[element.key] = defineAsyncComponent(element.render);
  };
}

export let elementConfig = new ElementConfig();

//注册模板
(function () {
  for (let key in template) {
    elementConfig.register(template[key]);
  }
  console.log("元素配置菜单注册完成", elementConfig);
})();
