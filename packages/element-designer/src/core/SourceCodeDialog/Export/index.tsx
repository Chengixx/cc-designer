import { formatJson, MonacoIDE, TabPane, Tabs } from "@cgx-designer/extensions";
import { ref, defineComponent, nextTick } from "vue";
import { BuilderSchema } from "@cgx-designer/types";
import {
  copyToClipboard,
  createSFCSourceCode,
  createSourceCode,
} from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { Message } from "@cgx-designer/extensions";

export interface ExportSourceCodeDialogExpose {
  handleOpen: (builderSchema: BuilderSchema) => void;
}

export const ExportSourceCodeDialog = defineComponent({
  setup(_, { expose }) {
    const Button = elementController.getElementRender("button");
    const Dialog = elementController.getElementRender("dialog");
    const currentTab = ref<string>("0");
    const jsonContent = ref<string>("");
    const cgxContent = ref<string>("");
    const sfcContent = ref<string>("");
    const IDERef = ref<typeof MonacoIDE | null>(null);
    const isShow = ref<boolean>(false);
    const handleOpen = (builderSchema: BuilderSchema) => {
      nextTick(() => {
        jsonContent.value = formatJson(builderSchema);
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
        currentTab.value === "0" ? jsonContent.value : cgxContent.value;

      copyToClipboard(
        targetValue as string,
        () => Message.success("复制成功"),
        () => Message.warning("复制失败")
      );
    };
    expose({
      handleOpen,
    });
    return () => {
      return (
        <Dialog
          title="导出"
          v-model={isShow.value}
          destroyOnClose
          style={{
            marginTop: "5vh !important",
          }}
        >
          {{
            default: () => (
              <Tabs v-model={currentTab.value} class="no-padding-tabs">
                <TabPane label="json代码">
                  <div class="c-h-[70vh]">
                    <MonacoIDE
                      ref={IDERef as any}
                      v-model={jsonContent.value}
                      mode="json"
                    />
                  </div>
                </TabPane>
                <TabPane label="vue代码">
                  <div class="c-h-[70vh]">
                    <MonacoIDE
                      ref={IDERef as any}
                      v-model={cgxContent.value}
                      mode="vue"
                    />
                  </div>
                </TabPane>
                <TabPane label="SFC代码">
                  <div class="c-h-[70vh]">
                    <MonacoIDE
                      ref={IDERef as any}
                      v-model={sfcContent.value}
                      mode="vue"
                    />
                  </div>
                </TabPane>
              </Tabs>
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
