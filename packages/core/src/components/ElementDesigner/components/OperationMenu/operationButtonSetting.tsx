import { Message } from "@cgx-designer/extensions";
import { FocusManage } from "@cgx-designer/hooks/src/useFocus";
import { FormManage } from "@cgx-designer/hooks/src/useForm";
import { ElementManage } from "@cgx-designer/hooks/src/useElement";
import { FunctionManage } from "@cgx-designer/hooks";
import {
  ClearIcon,
  DebugIcon,
  ExportIcon,
  ImportIcon,
  PreviewIcon,
  RedoIcon,
  TreeIcon,
  UndoIcon,
} from "@cgx-designer/icons";
import { BuilderSchema } from "../../../../../../cgx-designer/dist/core";

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
  commandManage: any,
  commands: Record<string, Function>,
  previewDialogRef: any,
  exportSourceCodeDialogRef: any,
  importSourceCodeDialogRef: any,
  treeDrawerRef:any
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
        console.log("当前队列管理", commandManage);
      },
      icon: DebugIcon,
    },
    Tree: {
      label: "树状图",
      handler: () => {
        treeDrawerRef.value.showDrawer()
      },
      icon: TreeIcon,
    },
    Clear: {
      label: "清空",
      handler: () => {
        if (elementManage.elementList.value.length === 0) {
          Message.warning("已经是空的啦!");
          return;
        }
        commands.handleClear();
      },
      icon: ClearIcon,
    },
    Undo: {
      label: "撤销",
      handler: () => {
        commands.undo();
      },
      icon: UndoIcon,
    },
    Redo: {
      label: "重做",
      handler: () => {
        commands.redo();
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
