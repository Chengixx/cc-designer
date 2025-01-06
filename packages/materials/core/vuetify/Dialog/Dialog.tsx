import { defineComponent } from "vue";
import {
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
} from "vuetify/components";
import { CloseIcon } from "@cgx-designer/icons";

const Dialog = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  },
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { attrs, slots, emit }) {
    return () => {
      const handleLeave = () => {
        emit("update:modelValue", false);
      };
      const renderProps: Record<string, any> = {
        modelValue: props.modelValue,
        ...attrs,
      };
      return (
        <VDialog
          {...renderProps}
          onAfterLeave={handleLeave}
          width="auto"
          style={{
            marginTop: "0vh !important",
          }}
        >
          <VCard minHeight={"80vh"} minWidth={"50vw"} maxWidth={"50vw"}>
            {/* 标题,有才显示,为了兼容element */}
            {props.title && (
              <VCardTitle class="c-flex c-justify-between c-items-center">
                <span class="c-text-base c-font-medium">{props.title}</span>
                <div
                  class="c-h-fit c-w-fit c-cursor-pointer"
                  onClick={handleLeave}
                >
                  <CloseIcon class="c-w-5 c-h-5 hover:c-fill-blue-500" />
                </div>
              </VCardTitle>
            )}

            {/* 文章内容 */}
            <VCardText>{slots.default && slots.default()}</VCardText>
            {/* 下面的操作插槽 */}
            <VCardActions>{slots.footer && slots.footer()}</VCardActions>
          </VCard>
        </VDialog>
      );
    };
  },
});

export default Dialog;
