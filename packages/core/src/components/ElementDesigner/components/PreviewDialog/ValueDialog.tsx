import { elementController } from "@cgx-designer/controller";
import IDE from "../../../IDE/index";
import { defineComponent, ref } from "vue";

export interface ValueDialogExpose {
  handleOpen: (formDataString: string) => void;
  handleClose: () => void;
}

export const ValueDialog = defineComponent({
  setup(_, { expose }) {
    const Button = elementController.getElementRender("button");
    const Dialog = elementController.getElementRender("dialog");
    const IDEValue = ref<string>("");
    const dialogShow = ref<boolean>(false);
    const handleOpen = (formDataString: string) => {
      dialogShow.value = true;
      IDEValue.value = formDataString;
    };
    const handleClose = () => {
      dialogShow.value = false;
      IDEValue.value = "";
    };

    expose({
      handleOpen,
      handleClose,
    });
    return () => {
      return (
        <Dialog
          destroyOnClose
          title="预览表单数据"
          v-model={dialogShow.value}
          beforeClose={handleClose}
          style={{
            marginTop: "10vh !important",
          }}
        >
          {{
            default: () => {
              return (
                <div class="c-h-[60vh] c-overflow-y-auto">
                  <IDE readonly v-model={IDEValue.value} />
                </div>
              );
            },
            footer: () => {
              return (
                <div>
                  <Button variant="outlined" onClick={handleClose}>
                    关闭
                  </Button>
                </div>
              );
            },
          }}
        </Dialog>
      );
    };
  },
});
