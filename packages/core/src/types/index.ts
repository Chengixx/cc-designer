import { ComponentPublicInstance } from "vue";

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
export interface FormSetting {
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
