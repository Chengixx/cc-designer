import { ElDialog } from "element-plus";
import { createVNode, render, ref, defineComponent, VNode } from "vue";

interface DialogExpose {
  showDialog: (option?: any) => void;
}

const DialogDom = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props, ctx) {
    const option = ref<any>(props.option);
    const isShow = ref<boolean>(false);
    const showDialog = (newOption: any) => {
      option.value = newOption;
      isShow.value = true;
    };
    ctx.expose({
      showDialog,
    });
    return () => {
      return (
        <ElDialog v-model={isShow.value}>
          {{
            default: () => {
              return option.value?.content;
            },
            header: () => {
              return option.value?.title;
            },
            footer: () => {
              return option.value?.footer;
            },
          }}
        </ElDialog>
      );
    };
  },
});

let VDom: VNode;

export const CCDialog = (option: any) => {
  if (!VDom) {
    let el = document.createElement("div");
    VDom = createVNode(DialogDom, { option });
    document.body.appendChild((render(VDom, el), el));
  }
  let { showDialog } = VDom.component!.exposed as DialogExpose;
  showDialog(option);
};
