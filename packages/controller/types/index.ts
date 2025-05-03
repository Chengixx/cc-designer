import { EventItem, IEditorElement } from "@cgx-designer/types";

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
