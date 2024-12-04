import { ElButton, ElDialog, ElNotification } from "element-plus";
import { ref, defineComponent, nextTick, inject } from "vue";
import IDE from "../../../../IDE";
import { checkCJsonType } from "@cgx-designer/utils";
import { FormManage, FunctionManage } from "@cgx-designer/hooks";

export interface ImportSourceCodeDialogExpose {
  handleOpen: () => void;
}

export const ImportSourceCodeDialog = defineComponent({
  setup(_, { expose }) {
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
          ElNotification.success("导入成功");
          isShow.value = false;
        } else {
          ElNotification.warning("导入失败，请检查数据格式");
        }
      } catch (error) {
        ElNotification.warning("导入失败，请检查数据格式");
      }
    };
    expose({
      handleOpen,
    });
    return () => {
      return (
        <ElDialog
          v-model={isShow.value}
          destroyOnClose
          style={{
            marginTop: "5vh !important",
          }}
        >
          {{
            default: () => (
              <div class="h-[70vh]">
                <IDE ref={IDERef} v-model={jsonContent.value} />
              </div>
            ),
            header: () => {
              return <div>导入</div>;
            },
            footer: () => (
              <>
                <ElButton onClick={handleCancel}>取消</ElButton>
                <ElButton type="primary" onClick={handleConfirm}>
                  确定
                </ElButton>
              </>
            ),
          }}
        </ElDialog>
      );
    };
  },
});
