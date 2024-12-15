import {
  ElButton,
  ElDialog,
  ElNotification,
  ElTabPane,
  ElTabs,
} from "element-plus";
import { ref, defineComponent, nextTick } from "vue";
import IDE from "../../../../IDE";
import { BuilderSchema } from "../../../../../../../cgx-designer/dist/core";
import { createSFCSourceCode, createSourceCode } from "@cgx-designer/utils";

export interface ExportSourceCodeDialogExpose {
  handleOpen: (builderSchema: BuilderSchema) => void;
}

export const ExportSourceCodeDialog = defineComponent({
  setup(_, { expose }) {
    const currentTab = ref<number>(1);
    const jsonContent = ref<string>("");
    const cgxContent = ref<string>("");
    const sfcContent = ref<string>("");
    const IDERef = ref<typeof IDE | null>(null);
    const isShow = ref<boolean>(false);
    const handleOpen = (builderSchema: BuilderSchema) => {
      nextTick(() => {
        jsonContent.value = JSON.stringify(builderSchema);
        cgxContent.value =
          createSourceCode(builderSchema).createCGXSourceCode();
        sfcContent.value =
          createSFCSourceCode(builderSchema).createSFCSourceCode();
      });
      isShow.value = true;
    };
    const handleCancel = () => {
      isShow.value = false;
    };
    const handleConfirm = () => {
      isShow.value = false;
      const targetValue: string =
        currentTab.value === 1 ? jsonContent.value : cgxContent.value;
      navigator.clipboard.writeText(targetValue).then(() => {
        ElNotification.success("复制成功");
      });
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
              <ElTabs
                v-model={currentTab.value}
                stretch
                class="no-padding-tabs"
                type="border-card"
              >
                <ElTabPane label="json代码" name={1}>
                  <div class="h-[70vh]">
                    <IDE ref={IDERef} v-model={jsonContent.value} />
                  </div>
                </ElTabPane>
                <ElTabPane label="vue代码" name={2}>
                  <div class="h-[70vh]">
                    <IDE ref={IDERef} v-model={cgxContent.value} mode="html" />
                  </div>
                </ElTabPane>
                <ElTabPane label="SFC代码" name={3}>
                  <div class="h-[70vh]">
                    <IDE ref={IDERef} v-model={sfcContent.value} mode="html" />
                  </div>
                </ElTabPane>
              </ElTabs>
            ),
            header: () => {
              return <div>导出</div>;
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
