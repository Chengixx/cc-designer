import { ElButton, ElDialog } from "element-plus";
import { createVNode, render, ref, defineComponent, VNode } from "vue";
import IDE from "../../../IDE";

interface DialogExpose {
  showDialog: (option?: any) => void;
}

const DialogDom = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props, { expose }) {
    const option = ref<any>(props.option);
    const IDERef = ref<typeof IDE | null>(null);
    const isShow = ref<boolean>(false);
    const showDialog = (newOption: any) => {
      IDERef.value?.setModelValue(newOption.content)
      option.value = newOption;
      isShow.value = true;
    };
    const handleCancel = () => {
      isShow.value = false;
      option.value.cancel && option.value.cancel();
    };
    const handleConfirm = () => {
      isShow.value = false;
      option.value.confirm && option.value.confirm(option.value!.content);
    };
    expose({
      showDialog,
    });
    return () => {
      return (
        <ElDialog v-model={isShow.value}>
          {{
            default: () => (
              <IDE ref={IDERef} v-model={option.value!.content} />
            ),
            header: () => {
              return option.value?.title;
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

let VDom: VNode;

export const InputDialog = (option: any) => {
  if (!VDom) {
    let el = document.createElement("div");
    VDom = createVNode(DialogDom, { option });
    document.body.appendChild((render(VDom, el), el));
  }
  let { showDialog } = VDom.component!.exposed as DialogExpose;
  showDialog(option);
};
