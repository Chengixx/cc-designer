import ElementBuilder from "../../../ElementBuilder";
import { ElButton, ElDialog, ElMessage } from "element-plus";
import { defineComponent, inject, ref } from "vue";
import { ElementManage, FormManage, FunctionManage } from "@cgx-designer/hooks";
import { deepClone } from "@cgx-designer/utils";
import { ElementBuilderExpose } from "../../../ElementBuilder/type";
import { ValueDialogExpose, ValueDialog } from "./ValueDialog";

const PreviewDialog = defineComponent({
  setup(_, { expose }) {
    const elementManage = inject("elementManage") as ElementManage;
    const formManage = inject("formManage") as FormManage;
    const functionManage = inject("functionManage") as FunctionManage;
    const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
    const ValueDialogRef = ref<ValueDialogExpose | null>(null);
    const dialogShow = ref<boolean>(false);
    const ElementBuilderKey = ref("");
    const handleOpen = () => {
      dialogShow.value = true;
      ElementBuilderKey.value = new Date().getTime().toString();
    };
    const handleClose = () => {
      dialogShow.value = false;
      //同时清空一下form的数据
      elementBuilderRef.value!.resetFormDataToEmpty();
    };
    const handleGetFormData = () => {
      console.log("look", elementBuilderRef.value!.formRef);
      console.log("查看表单的数据", elementBuilderRef.value!.formData);
      ValueDialogRef.value?.handleOpen(JSON.stringify(elementBuilderRef.value!.formData));
    };
    const handleValidFormData = () => {
      //防抖节流一下 防止一直点
      elementBuilderRef.value!.formRef.validate((valid: boolean) => {
        if (valid) {
          ElMessage.success({
            message: "校验通过",
            duration: 1000,
          });
        } else {
          console.log("校验失败");
        }
      });
    };
    expose({
      handleOpen,
      handleClose,
    });
    return () => {
      return (
        <>
          <ElDialog
            destroyOnClose
            title="预览"
            v-model={dialogShow.value}
            beforeClose={handleClose}
            style={{
              marginTop: "5vh !important",
            }}
          >
            {{
              default: () => {
                return (
                  <div class="c-h-[70vh] c-overflow-y-auto">
                    <ElementBuilder
                      key={ElementBuilderKey.value}
                      ref={elementBuilderRef}
                      script={functionManage.javaScriptVal.value}
                      elementSchemaList={deepClone(
                        elementManage.elementList.value
                      )}
                      formSetting={formManage.formSetting}
                    />
                  </div>
                );
              },
              footer: () => {
                return (
                  <div>
                    <ElButton onClick={handleClose}>关闭</ElButton>
                    <ElButton type="primary" onClick={handleValidFormData}>
                      模拟校验
                    </ElButton>
                    <ElButton type="primary" onClick={handleGetFormData}>
                      查看数据
                    </ElButton>
                  </div>
                );
              },
            }}
          </ElDialog>
          <ValueDialog ref={ValueDialogRef} />
        </>
      );
    };
  },
});
export default PreviewDialog;
