import { registerVueLanguage } from "@cgx-designer/extensions";
import { registerPrivateCompoents } from "@cgx-designer/private-materials";
import * as monaco from "monaco-editor";
import { createOperationButtonSetting } from "./OperationMenu/operationButtonSetting";
import {
  ElementManage,
  FocusManage,
  FormManage,
  QueueManage,
  FunctionManage,
  SourceDataManage,
} from "@cgx-designer/hooks";

export const initMonacoVue = async () => {
  // 注册 Vue 语言支持
  registerVueLanguage();

  // 注册其他语言（Monaco 内置支持）
  monaco.languages.register({ id: "typescript" });
  monaco.languages.register({ id: "javascript" });
  monaco.languages.register({ id: "json" });
  monaco.languages.register({ id: "css" });
  monaco.languages.register({ id: "html" });
};

export const initCGXDesigner = (
  manages: {
    formManager: FormManage;
    elementManager: ElementManage;
    functionManager: FunctionManage;
    focusManager: FocusManage;
    sourceDataManager: SourceDataManage;
    queueManager: QueueManage;
  },
  refs: {
    previewDialogRef: any;
    exportSourceCodeDialogRef: any;
    importSourceCodeDialogRef: any;
    searchBarRef: any;
  }
) => {
  registerPrivateCompoents();
  initMonacoVue();
  const buttonMap = createOperationButtonSetting(manages, refs);

  return {
    buttonMap,
  };
};
