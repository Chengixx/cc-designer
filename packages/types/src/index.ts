import { ComponentPublicInstance } from "vue";
import { elementController } from "@cgx-designer/controller";
import { ElementRenderer } from "@cgx-designer/element-renderer";
import { SourceDataItem } from "@cgx-designer/hooks";

//schema原型
export interface ISchemaPrototype {
  key: string;
  field?: string;
  elementList?: IElementSchema[];
  props?: Record<string, any>;
}

//属性的schema
export interface IAttributeSchema extends ISchemaPrototype {
  getter?: (...args: any[]) => any;
  setter?: (...args: any[]) => undefined | void;
  show?: (...args: any[]) => boolean;
  onChange?: (...args: any[]) => undefined | void;
  [key: string]: any;
}

//元素被渲染之后的的schema
export interface IElementSchema extends ISchemaPrototype {
  id?: string;
  formItem?: boolean;
  noShowFormItem?: boolean;
  [key: string]: any;
}

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
  isChildContainer?: boolean;
  [key: string]: any;
  config?: {
    //全部变成可选的
    attribute?: IAttributeSchema[];
    event?: EventItem[];
    action?: EventItem[];
  };
}

export interface ElementPlugin {
  name: ElementLib;
  template: Record<string, IElementBaseSetting>;
  formConfig: IAttributeSchema[]; //表单配置
}

export type ElementLib = "element-plus" | "vuetify";

export type ElementListMode = "bar" | "box";

export type ElementMaterial = {
  title: string;
  materials: IElementBaseSetting[];
};

//元素被渲染之后的实例
export interface ElementInstance extends ComponentPublicInstance {
  setValue?: (value: any) => void;
  getValue?: () => any;
  setAttr?: (key: string, value: any) => any;
  getAttr?: (key: string) => any;
}

//树节点
export interface TreeNode {
  id: string;
  key: string;
  children?: TreeNode[];
}

//表单设置
export interface ElementPlusFormSetting {
  modelName?: string;
  refName?: string;
  rulesName?: string;
  labelWidth?: number;
  labelPosition?: "top" | "left" | "right";
  size?: "default" | "small" | "large";
  disabled?: boolean;
  on?: Record<string, EventInstance[]>;
  [key: string]: any;
}

export interface VuetifyFormSetting {
  [key: string]: any;
}

export type FormSetting = ElementPlusFormSetting | VuetifyFormSetting;

//表单校验规则
export interface RuleItem {
  trigger?: string | string[];
  required?: boolean;
  type?: string;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  len?: number;
  enum?: Array<string | number | boolean | null | undefined>;
  whitespace?: boolean;
  validator?: string;
  isValidator?: boolean;
  message?: string | ((a?: string) => string);
  prototype?: string;
  [key: string]: any;
}

//完整生成的schema
export interface BuilderSchema {
  formSetting: FormSetting;
  elementList: IElementSchema[];
  script: string;
  sourceData: SourceDataItem[];
}

//事件原型以及列表
export interface EventPrototype {
  title: string;
  events: EventItem[];
}

//单个事件的配置原型
export interface EventItem {
  type: string;
  describe: string;
  argsConfigs?: any;
}

//事件的实例
export interface EventInstance {
  //事件的类型
  type: null | string | undefined;
  //当前选中的方法
  methodName: null | string | undefined;
  //如果是组件的话 组件的id
  componentId?: null | string | undefined;
  //参数
  args?: string;
}

const Form = elementController.getElementRender("form");

//可以传递的参数
export interface ElementBuilderProps {
  formData?: Record<string, any>;
  elementSchemaList?: IElementSchema[];
  formSetting?: FormSetting;
  script?: string;
  //此schema为上面三个配置项的总和 如果有此配置项 以此配置项为主
  builderSchema?: BuilderSchema;
}

//暴露出来的方法
export interface ElementBuilderExpose {
  formRef: InstanceType<typeof Form>;
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  resetFormDataToEmpty: () => void;
}

export type ElementBuilderInstance = InstanceType<typeof ElementRenderer>;

//全局函数
export interface IGlobalFunction {
  key: string;
  tip?: string;
  name: string;
  callback: (...args: any[]) => any;
}

//队列项
export interface IQueueItem {
  type: string;
  elementList: IElementSchema[];
  focusElementId: string | null;
}
