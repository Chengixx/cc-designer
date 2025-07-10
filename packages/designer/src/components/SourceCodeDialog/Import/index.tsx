import { ref, defineComponent, nextTick, inject } from "vue";
import { IDE } from "@cgx-designer/extensions";
import { checkCJsonType } from "@cgx-designer/utils";
import {
  ElementManage,
  FormManage,
  FunctionManage,
  SourceDataManage,
} from "@cgx-designer/hooks";
import { elementController } from "@cgx-designer/controller";
import { Message } from "@cgx-designer/extensions";

export interface ImportSourceCodeDialogExpose {
  handleOpen: () => void;
}

export const ImportSourceCodeDialog = defineComponent({
  setup(_, { expose }) {
    const Button = elementController.getElementRender("button");
    const Dialog = elementController.getElementRender("dialog");
    const formManage = inject("formManage") as FormManage;
    const functionManage = inject("functionManage") as FunctionManage;
    const sourceDataManage = inject("sourceDataManage") as SourceDataManage;
    const elementManage = inject("elementManage") as ElementManage;
    const jsonContent = ref<string>("");
    const IDERef = ref<typeof IDE | null>(null);
    const isShow = ref<boolean>(false);
    const handleOpen = () => {
      nextTick(() => {
        jsonContent.value = "";
      });
      isShow.value = true;
    };
    const handleCancel = () => {
      isShow.value = false;
    };
    const handleConfirm = () => {
      const value = jsonContent.value;
      try {
        if (value && checkCJsonType(JSON.parse(value))) {
          elementManage.setElementList(JSON.parse(value).elementList);
          formManage.setFormSetting(JSON.parse(value).formSetting);
          functionManage.setJavaScriptVal(JSON.parse(value).script);
          sourceDataManage.setSourceData(JSON.parse(value).sourceData);
          Message.success("导入成功");
          isShow.value = false;
        } else {
          Message.warning("导入失败，请检查数据格式");
        }
      } catch (error) {
        Message.warning("导入失败，请检查数据格式");
      }
    };
    expose({
      handleOpen,
    });
    return () => {
      return (
        <Dialog
          title="导入"
          v-model={isShow.value}
          destroyOnClose
          style={{
            marginTop: "5vh !important",
          }}
        >
          {{
            default: () => (
              <div class="c-h-[70vh]">
                <IDE ref={IDERef as any} v-model={jsonContent.value} />
              </div>
            ),
            footer: () => (
              <>
                <Button onClick={handleCancel}>取消</Button>
                <Button type="primary" onClick={handleConfirm}>
                  确定
                </Button>
              </>
            ),
          }}
        </Dialog>
      );
    };
  },
});
