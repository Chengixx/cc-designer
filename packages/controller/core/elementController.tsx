import { defineAsyncComponent, defineComponent, Fragment, ref } from "vue";
import {
  deepClone,
  getRandomId,
  stringFirstSmaller,
} from "@cgx-designer/utils";
import { EventItem, IEditorElement } from "@cgx-designer/types";

export const BaseComponent = defineComponent({
  name: "BaseComponent",
  inheritAttrs: false,
  setup(_, { slots }) {
    return () => {
      return <Fragment>{slots.default ? slots.default() : null}</Fragment>;
    };
  },
});

//元素基础类型
export interface IElementBaseSetting {
  key: string;
  label: string;
  render: any;
  group?: string;
  icon?: any;
  template?: any;
  formItem?: boolean;
  noPushList?: boolean;
  [key: string]: any;
  config?: {
    //全部变成可选的
    attribute?: IEditorElement[];
    event?: EventItem[];
    action?: EventItem[];
  };
}

export interface ElementPlugin {
  name: ElementLib;
  template: Record<string, IElementBaseSetting>;
  formConfig: IEditorElement[]; //表单配置
}

export type ElementLib = "element-plus" | "vuetify";

export type ElementListMode = "bar" | "box";

export type ElementMaterial = {
  title: string;
  materials: IElementBaseSetting[];
};

//创建组件基础配置的东西
export class ElementController {
  //是否已经初始化完成
  isReady = ref<boolean>(false);
  //当前使用的是哪个组件库(内部)
  elementLibrary = ref<ElementPlugin | undefined>(undefined);
  //当前组件库的基础组件(用于删除和缓存)
  libElementKeys: string[] = [];
  //初始的模板，初始的schema
  elementTemplate: Record<string, (uuid: Function) => IEditorElement> = {};
  //能用的是哪些,用于渲染左侧物料列表
  elementList = ref<ElementMaterial[]>([]);
  //左侧物料列表的模式
  elementListMode = ref<ElementListMode>("box");
  //根据key去做能用的是哪些
  elementConfigMap: Record<string, IElementBaseSetting> = {};
  //用于渲染的map
  elementRenderMap: Record<string, any> = {};
  //总的install(这个主要是实际生产用的时候注册插件
  install = (elementPlugin: ElementPlugin) => {
    const { template } = elementPlugin;
    for (let key in template) {
      elementController.register(template[key]);
      this.addLibElementKey(key);
    }
    //所有组件都安装完毕之后，设置控制器告诉它当前使用的组件库
    this.elementLibrary.value = elementPlugin;
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
      this.removeComponent(key);
    });
    this.libElementKeys = [];
    console.warn("[lib]:" + this.elementLibrary.value?.name + "删除完毕");
    this.elementLibrary.value = undefined;
  };
  //删除某个组件(Map里去掉)
  removeComponent = (key: string) => {
    if (!this.elementConfigMap[key].noPushList) {
      const group = this.elementConfigMap[key].group;
      //删除列表里的,找到他是哪个分组的 这里是肯定会有分组的
      const groupIndex = this.elementList.value.findIndex(
        (elementMaterial) => elementMaterial.title === group
      );
      this.elementList.value[groupIndex].materials = this.elementList.value[
        groupIndex
      ].materials.filter((element) => element.key !== key);
      // 此时如果已经是空了这个分组 就可以去掉了
      if (this.elementList.value[groupIndex].materials.length === 0) {
        this.elementList.value.splice(groupIndex, 1);
      }
    }
    // 照常清除
    delete this.elementConfigMap[key];
    delete this.elementRenderMap[key];
    delete this.elementTemplate[key];
  };
  //获取当前组件库的所有内容
  getCurrentElementPlugin = () => {
    return this.elementLibrary.value;
  };
  //获取当前组件库的名称
  getCurrentElementLibraryName = () => {
    return this.elementLibrary.value?.name;
  };
  //增加当前组件库的key
  addLibElementKey = (key: string) => {
    this.libElementKeys.push(stringFirstSmaller(key));
  };
  //注册元素到左侧菜单栏，必须走这里过
  register = (elementBaseConfig: IElementBaseSetting) => {
    //此处必须深拷贝 防止每次都修改到原本对象
    const localElementBaseConfig = deepClone(elementBaseConfig);
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
    // console.log(localElementBaseConfig);
    // 最重要的一步 注册到左侧菜单栏 要注意分组
    // 首先如果不放进去 那肯定就不用了
    if (!localElementBaseConfig.noPushList) {
      const group = localElementBaseConfig.group;
      //看一下在哪一个
      const groupIndex = this.elementList.value.findIndex(
        (elementMaterial) => elementMaterial.title === group
      );
      //如果没有，那就说明要新分组,并且这个直接放进去
      if (groupIndex === -1) {
        this.elementList.value.push({
          title: group!,
          materials: [localElementBaseConfig],
        });
      } else {
        //如果有的话，那就直接放进去
        this.elementList.value[groupIndex].materials.push(
          localElementBaseConfig
        );
      }
    }
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
    //检查元素是否有分组信息 没有的话 加上默认的自定义组件信息(提供的组件肯定都有分组信息)
    if (!Object.keys(elementBaseConfig).includes("group")) {
      elementBaseConfig.group = "自定义组件";
    }
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
    return this.elementRenderMap[key] ?? BaseComponent;
  };
  //获取element配置
  getElementConfig = (key: string) => {
    return this.elementConfigMap[key];
  };
}

//提供一个实例
export const elementController = new ElementController();
