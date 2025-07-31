import { Message } from "@cgx-designer/extensions";
import { FocusManage } from "@cgx-designer/hooks/src/useFocus";
import { FormManage } from "@cgx-designer/hooks/src/useForm";
import { ElementManage } from "@cgx-designer/hooks/src/useElement";
import {
  FunctionManage,
  QueueManage,
  SourceDataManage,
} from "@cgx-designer/hooks";
import {
  ClearIcon,
  DebugIcon,
  ExportIcon,
  ImportIcon,
  PreviewIcon,
  RedoIcon,
  SearchIcon,
  UndoIcon,
} from "@cgx-designer/icons";
import { BuilderSchema } from "@cgx-designer/types";

export interface OperationButtonSetting {
  label: string;
  handler: ((...args: any[]) => any) | undefined;
  icon: any;
}

export const createOperationButtonSetting = (
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
): Record<string, OperationButtonSetting> => {
  const {
    formManager,
    elementManager,
    functionManager,
    focusManager,
    sourceDataManager,
    queueManager,
  } = manages;
  const {
    previewDialogRef,
    exportSourceCodeDialogRef,
    importSourceCodeDialogRef,
    searchBarRef,
  } = refs;
  const ButtonMap = {
    Message: {
      label: "查看日志",
      handler: () => {
        console.log("总体元素列表", elementManager.elementList);
        console.log("当前选中的元素", focusManager.focusedElement.value);
        console.log(
          "组件Dom对象实例Map",
          elementManager.elementInstanceList.value
        );
        console.log("当前function管理", functionManager);
        console.log("当前队列管理", queueManager, queueManager.getInstance());
      },
      icon: DebugIcon,
    },
    Clear: {
      label: "清空",
      handler: () => {
        if (elementManager.elementList.value.length === 0) {
          Message.warning("已经是空的啦!");
          return;
        }
        elementManager.deleteAllElements();
        focusManager.resetFocus();
        queueManager.push("clear");
      },
      icon: ClearIcon,
    },
    Undo: {
      label: "撤销",
      handler: () => {
        queueManager.undo();
      },
      icon: UndoIcon,
    },
    Redo: {
      label: "重做",
      handler: () => {
        queueManager.redo();
      },
      icon: RedoIcon,
    },
    Export: {
      label: "导出",
      handler: () => {
        const tempObj: BuilderSchema = {
          formSetting: formManager.formSetting,
          elementList: elementManager.elementList.value,
          script: functionManager.javaScriptVal.value,
          sourceData: sourceDataManager.sourceData.value,
        };
        exportSourceCodeDialogRef.value.handleOpen(tempObj);
      },
      icon: ExportIcon,
    },
    Import: {
      label: "导入",
      handler: () => {
        importSourceCodeDialogRef.value.handleOpen();
      },
      icon: ImportIcon,
    },
    Preview: {
      label: "预览",
      handler: () => {
        previewDialogRef.value.handleOpen();
      },
      icon: PreviewIcon,
    },
    Search: {
      label: "搜索",
      handler: () => {
        searchBarRef.value.show();
      },
      icon: SearchIcon,
    },
  };
  console.log("操作栏按钮列表注册完成", ButtonMap);
  return ButtonMap;
};
