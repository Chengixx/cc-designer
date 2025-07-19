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
  UndoIcon,
} from "@cgx-designer/icons";
import { BuilderSchema } from "@cgx-designer/types";

export interface OperationButtonSetting {
  label: string;
  handler: ((...args: any[]) => any) | undefined;
  icon: any;
}

export const createOperationButtonSetting = (
  formManage: FormManage,
  elementManage: ElementManage,
  functionManage: FunctionManage,
  focusManage: FocusManage,
  sourceDataManage: SourceDataManage,
  queueManage: QueueManage,
  previewDialogRef: any,
  exportSourceCodeDialogRef: any,
  importSourceCodeDialogRef: any
): Record<string, OperationButtonSetting> => {
  const ButtonMap = {
    Message: {
      label: "查看日志",
      handler: () => {
        console.log("总体元素列表", elementManage.elementList);
        console.log("当前选中的元素", focusManage.focusedElement.value);
        console.log(
          "组件Dom对象实例Map",
          elementManage.elementInstanceList.value
        );
        console.log("当前function管理", functionManage);
        console.log("当前队列管理", queueManage, queueManage.getInstance());
      },
      icon: DebugIcon,
    },
    Clear: {
      label: "清空",
      handler: () => {
        if (elementManage.elementList.value.length === 0) {
          Message.warning("已经是空的啦!");
          return;
        }
        elementManage.deleteAllElements();
        focusManage.resetFocus();
        queueManage.push("clear");
      },
      icon: ClearIcon,
    },
    Undo: {
      label: "撤销",
      handler: () => {
        queueManage.undo();
      },
      icon: UndoIcon,
    },
    Redo: {
      label: "重做",
      handler: () => {
        queueManage.redo();
      },
      icon: RedoIcon,
    },
    Export: {
      label: "导出",
      handler: () => {
        const tempObj: BuilderSchema = {
          formSetting: formManage.formSetting,
          elementList: elementManage.elementList.value,
          script: functionManage.javaScriptVal.value,
          sourceData: sourceDataManage.sourceData.value,
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
  };
  console.log("操作栏按钮列表注册完成", ButtonMap);
  return ButtonMap;
};
