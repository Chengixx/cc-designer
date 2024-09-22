import ElementBuilder from "../../../ElementBuilder";
import { ElDialog } from "element-plus";
import { defineComponent, ref } from "vue";

const PreviewDialog = defineComponent({
  setup(_, { expose }) {
    const dialogShow = ref<boolean>(false);
    const open = () => {
      dialogShow.value = true;
    };
    const close = () => {
      dialogShow.value = false;
    };
    expose({
      open,
      close,
    });
    return () => {
      return (
        <ElDialog title="预览" v-model={dialogShow.value} beforeClose={close}>
          <ElementBuilder />
        </ElDialog>
      );
    };
  },
});
export default PreviewDialog;
