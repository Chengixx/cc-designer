import { BuilderSchema, FormSetting, IEditorElement } from "../../types/index";
import ElementBuilder from "./index";
import { elementController } from "@cgx-designer/controller";

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

export type ElementBuilderInstance = InstanceType<typeof ElementBuilder>;
