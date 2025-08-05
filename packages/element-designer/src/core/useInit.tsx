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
  useKeyboard,
} from "@cgx-designer/hooks";
import { defineComponent } from "vue";
import { elementController } from "@cgx-designer/controller";
import { Loading } from "@cgx-designer/extensions";
import { isMac } from "@cgx-designer/utils";

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

  //mac是command+z，windows是ctrl+z
  useKeyboard([
    {
      key: isMac ? "cmd+z" : "ctrl+z",
      handler: manages.queueManager.undo,
    },
    {
      key: isMac ? "cmd+shift+z" : "ctrl+shift+z",
      handler: manages.queueManager.redo,
    },
    {
      key: isMac ? "cmd+f" : "ctrl+f",
      handler: () => {
        refs.searchBarRef.value.show();
      },
    },
  ]);

  return {
    buttonMap,
  };
};

export const DesignerShell = defineComponent({
  setup(_, { slots }) {
    return () => (
      <>
        {elementController.isReady.value ? (
          <>{slots.default?.()}</>
        ) : (
          <Loading />
        )}
      </>
    );
  },
});
