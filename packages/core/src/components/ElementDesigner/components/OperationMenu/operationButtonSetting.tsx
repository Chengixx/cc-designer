import { TreeDrawer } from "@cgx-designer/core/src/components/TreeDrawer";
import { checkCJsonType } from "@cgx-designer/utils/common";
import { ElNotification } from "element-plus";
import { FocusManage } from "@cgx-designer/hooks/src/useFocus";
import { FormManage } from "@cgx-designer/hooks/src/useForm";
import { ElementManage } from "@cgx-designer/hooks/src/useElement";
import { FunctionManage } from "@cgx-designer/hooks";
import {
  ClearIcon,
  ExportIcon,
  ImportIcon,
  MessageIcon,
  PreviewIcon,
  RedoIcon,
  TreeIcon,
  UndoIcon,
} from "@cgx-designer/icons";

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
  commands: Record<string, Function>,
  showPreviewDialog: () => void,
  showSourceCodeDialog: Function
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
      },
      icon: MessageIcon,
    },
    Tree: {
      label: "树状图",
      handler: () => {
        TreeDrawer(elementManage, focusManage);
      },
      icon: TreeIcon,
    },
    Clear: {
      label: "清空",
      handler: () => {
        if (elementManage.elementList.value.length === 0) {
          ElNotification.warning("已经是空的啦!");
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
        const tempObj = {
          formSetting: formManage.formSetting,
          elementList: elementManage.elementList.value,
          script: functionManage.javaScriptVal.value,
        };
        showSourceCodeDialog({
          title: "导出",
          content: JSON.stringify(tempObj),
          confirm: (value: string) => {
            //复制到剪切板
            navigator.clipboard.writeText(value).then(() => {
              ElNotification.success("复制成功");
            });
          },
        });
      },
      icon: ExportIcon,
    },
    Import: {
      label: "导入",
      handler: () => {
        showSourceCodeDialog({
          title: "导入",
          content: "",
          confirm: (value: string) => {
            try {
              if (value && checkCJsonType(JSON.parse(value))) {
                commands.handleImport(JSON.parse(value).elementList);
                formManage.setFormSetting(JSON.parse(value).formSetting);
                functionManage.setJavaScriptVal(JSON.parse(value).script);
                ElNotification.success("导入成功");
              } else {
                ElNotification.warning("导入失败，请检查数据格式");
              }
            } catch (error) {
              ElNotification.warning("导入失败，请检查数据格式");
            }
          },
        });
      },
      icon: ImportIcon,
    },
    Preview: {
      label: "预览",
      handler: () => {
        showPreviewDialog();
      },
      icon: PreviewIcon,
    },
  };
  console.log("操作栏按钮列表注册完成", ButtonMap);
  return ButtonMap;
};
