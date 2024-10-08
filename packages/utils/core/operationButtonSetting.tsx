import { InputDialog } from "cgx-designer/src/components/ElementDesigner/components/InputDialog";
import { TreeDrawer } from "cgx-designer/src/components/TreeDrawer";
import { isFormWithEditorElements } from "../common/index";
import { ElNotification } from "element-plus";
import { FocusManage } from "@cgx-designer/hooks/src/useFocus";
import { FormManage } from "@cgx-designer/hooks/src/useForm";
import { ElementManage } from "@cgx-designer/hooks/src/useElement";

export interface OperationButtonSetting {
  label: string;
  handler: ((...args: any[]) => any) | undefined;
}

export const createOperationButtonSetting = (
  formManage: FormManage,
  elementManage: ElementManage,
  focusManange: FocusManage,
  commands: Record<string, Function>,
  showPreviewDialog: () => void
): OperationButtonSetting[] => {
  const btnList = [
    {
      label: "查看日志",
      handler: () => {
        console.log("总体元素列表", elementManage.elementList);
        console.log("当前选中的元素", focusManange.focusedElement.value);
        console.log("树", elementManage.getTree());
        console.log("组件对象实例Map", elementManage.elementInstanceList.value);
      },
    },
    {
      label: "树状图",
      handler: () => {
        TreeDrawer(elementManage, focusManange);
      },
    },
    {
      label: "清空",
      handler: () => {
        if (elementManage.elementList.value.length === 0) {
          ElNotification.warning("已经是空的啦!");
          return;
        }
        commands.clear();
      },
    },
    {
      label: "撤销",
      handler: () => {
        commands.undo();
      },
    },
    {
      label: "重做",
      handler: () => {
        commands.redo();
      },
    },
    {
      label: "导出",
      handler: () => {
        const tempObj = {
          formSetting: formManage.formSetting,
          elementList: elementManage.elementList.value,
        };
        InputDialog({
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
    },
    {
      label: "导入",
      handler: () => {
        InputDialog({
          title: "导入",
          content: "",
          confirm: (value: string) => {
            try {
              if (value && isFormWithEditorElements(JSON.parse(value))) {
                commands.import(JSON.parse(value).elementList);
                formManage.setFormSetting(JSON.parse(value).formSetting);
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
    },
    {
      label: "预览",
      handler: () => {
        showPreviewDialog();
      },
    },
  ];
  console.log("操作栏按钮列表注册完成", btnList);
  return btnList;
};
