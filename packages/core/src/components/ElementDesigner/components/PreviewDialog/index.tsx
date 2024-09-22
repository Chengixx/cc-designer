import { CCButton } from "@cgx-designer/ui";
import ElementBuilder from "../../../ElementBuilder";
import { ElButton, ElDialog } from "element-plus";
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
    };
    const handleGetFormData = () => {
      console.log("look", elementBuilderRef.value!.formRef);
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
