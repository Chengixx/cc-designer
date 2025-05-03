import { ComponentPublicInstance } from "vue";
import { elementController } from "@cgx-designer/controller";
import { ElementRenderer } from "@cgx-designer/renderer";

//元素被渲染之后的的schema
export interface IEditorElement {
  id?: string;
  key: string;
  field?: string;
  elementList?: IEditorElement[];
  formItem?: boolean;
  noShowFormItem?: boolean;
  props?: Record<string, any>;
  [key: string]: any;
}

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
  elementList: IEditorElement[];
  script: string;
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
  elementSchemaList?: IEditorElement[];
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
