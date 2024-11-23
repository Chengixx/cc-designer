import ElementBuilder from "../../../ElementBuilder";
import { ElButton, ElDialog, ElMessage } from "element-plus";
import { defineComponent, inject, ref } from "vue";
import { ElementManage, FormManage, FunctionManage } from "@cgx-designer/hooks";
import { deepClone } from "@cgx-designer/utils";
import { ElementBuilderExpose } from "../../../ElementBuilder/type";

const PreviewDialog = defineComponent({
  setup(_, { expose }) {
    const elementManage = inject("elementManage") as ElementManage;
    const formManage = inject("formManage") as FormManage;
    const functionManage = inject("functionManage") as FunctionManage;
    const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
    const dialogShow = ref<boolean>(false);
    const ElementBuilderKey = ref("");
    const open = () => {
      dialogShow.value = true;
      ElementBuilderKey.value = new Date().getTime().toString();
    };
    const close = () => {
      dialogShow.value = false;
      //同时清空一下form的数据
      elementBuilderRef.value!.resetFormDataToEmpty();
    };
    const handleGetFormData = () => {
      console.log("look", elementBuilderRef.value!.formRef);
      console.log("查看表单的数据", elementBuilderRef.value!.formData);
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
      open,
      close,
    });
    return () => {
      return (
        <ElDialog
          destroyOnClose
          title="预览"
          v-model={dialogShow.value}
          beforeClose={close}
          style={{
            marginTop: "5vh !important",
          }}
        >
          {{
            default: () => {
              return (
                <div class="h-[75vh] overflow-y-auto">
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
                  <ElButton onClick={close}>关闭</ElButton>
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
      );
    };
  },
});
export default PreviewDialog;
