import { ElButton } from "element-plus";
import { ref, defineComponent, nextTick, inject } from "vue";
import IDE from "../../../../IDE";
import { checkCJsonType } from "@cgx-designer/utils";
import { FormManage, FunctionManage } from "@cgx-designer/hooks";
import { elementController } from "@cgx-designer/controller";
import { Message } from "@cgx-designer/extensions";

export interface ImportSourceCodeDialogExpose {
  handleOpen: () => void;
}

export const ImportSourceCodeDialog = defineComponent({
  setup(_, { expose }) {
    const Dialog = elementController.getElementRender("dialog");
    const commands: Record<string, Function> | undefined = inject("commands");
    const formManage = inject("formManage") as FormManage;
    const functionManage = inject("functionManage") as FunctionManage;
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
          commands!.handleImport(JSON.parse(value).elementList);
          formManage.setFormSetting(JSON.parse(value).formSetting);
          functionManage.setJavaScriptVal(JSON.parse(value).script);
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
                <IDE ref={IDERef} v-model={jsonContent.value} />
              </div>
            ),
            footer: () => (
              <>
                <ElButton onClick={handleCancel}>取消</ElButton>
                <ElButton type="primary" onClick={handleConfirm}>
                  确定
                </ElButton>
              </>
            ),
          }}
        </Dialog>
      );
    };
  },
});
