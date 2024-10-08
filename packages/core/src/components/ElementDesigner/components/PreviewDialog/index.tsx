import { CCButton } from "@cgx-designer/ui";
import ElementBuilder from "../../../ElementBuilder";
import { ElDialog, ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";

const PreviewDialog = defineComponent({
  setup(_, { expose }) {
    const elementBuilderRef = ref<any>();
    const dialogShow = ref<boolean>(false);
    const open = () => {
      dialogShow.value = true;
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
        <ElDialog title="预览" v-model={dialogShow.value} beforeClose={close}>
          {{
            default: () => {
              return <ElementBuilder ref={elementBuilderRef} />;
            },
            footer: () => {
              return (
                <div>
                  <CCButton class="mr-1" onClick={close}>
                    关闭
                  </CCButton>
                  <CCButton class="mr-1" onClick={handleValidFormData}>
                    模拟校验
                  </CCButton>
                  <CCButton onClick={handleGetFormData}>查看数据</CCButton>
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
