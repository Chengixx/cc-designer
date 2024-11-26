import { ElButton, ElDialog } from "element-plus";
import { ref, defineComponent, reactive, nextTick } from "vue";
import IDE from "../../../IDE";

export interface SourceCodeDialogExpose {
  showDialog: (option?: any) => void;
}

interface OptionType {
  title: string;
  content: string;
  confirm: Function;
  cancel: Function;
}

export const SourceCodeDialog = defineComponent({
  setup(_, { expose }) {
    const option = reactive<OptionType>({
      title: "",
      content: "",
      confirm: () => {},
      cancel: () => {},
    });
    const IDERef = ref<typeof IDE | null>(null);
    const isShow = ref<boolean>(false);
    const handleOpen = (newOption: OptionType) => {
      nextTick(() => {
        option.title = newOption.title;
        option.content = newOption.content;
        option.confirm = newOption.confirm;
        option.cancel = newOption.cancel;
      });
      isShow.value = true;
    };
    const handleCancel = () => {
      isShow.value = false;
      option.cancel && option.cancel();
    };
    const handleConfirm = () => {
      isShow.value = false;
      option.confirm && option.confirm(option.content);
    };
    expose({
      handleOpen,
    });
    return () => {
      return (
        <ElDialog v-model={isShow.value} destroyOnClose>
          {{
            default: () => (
              <div class="h-[60vh]">
                <IDE ref={IDERef} v-model={option.content} />
              </div>
            ),
            header: () => {
              return option.title;
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
