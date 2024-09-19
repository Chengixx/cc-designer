export interface IEditorElement {
  id: string;
  key: string;
  elementList?: IEditorElement[];
  props: Record<string, any>;
}

export interface TreeNode {
  id: string;
  key: string;
  children?: TreeNode[];
}

export interface FormSetting {
  modelName: string;
  refName: string;
  rulesName: string;
  labelWidth: number;
  labelPosition: "top" | "left" | "right";
  size: "default" | "small" | "large";
}
