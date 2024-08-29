import { InputDialog } from "@/components/InputDialog";
import { TreeDrawer } from "@/components/TreeDrawer";
import { useElementStore, useElementStoreHook } from "@/store/modules/element";
import { isFormWithEditorElements } from "@/utils";
import { ElNotification } from "element-plus";
import useFocus from "../hook/useFocus";
import { useFormStoreHook } from "@/store/modules/form";
import exportCode from "@/utils/exportCode";

interface OperationButtonSetting {
  label: string;
  handler: ((...args: any[]) => any) | undefined;
}

const createOperationButtonSetting = (
  commands: Record<string, Function>
): OperationButtonSetting[] => {
  const btnList = [
    {
      label: "查看日志",
      handler: () => {
        console.log("总体元素列表", useElementStoreHook().elementList);
        console.log("当前选中的元素", useFocus().getFocusElement());
        console.log("树", useElementStoreHook().getTree());
        console.log("导出的vue项目文件", exportCode());
        console.log("组件对象实例Map", useElementStore().elementInstanceList);
      },
    },
    {
      label: "树状图",
      handler: () => {
        TreeDrawer();
      },
    },
    {
      label: "清空",
      handler: () => {
        if (useElementStoreHook().elementList.length === 0) {
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
          formSetting: useFormStoreHook().formSetting,
          elementList: useElementStoreHook().elementList,
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
                useFormStoreHook().setFormSetting(
                  JSON.parse(value).formSetting
                );
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
  ];
  console.log("操作栏按钮列表注册完成", btnList);
  return btnList;
};

export default createOperationButtonSetting;
