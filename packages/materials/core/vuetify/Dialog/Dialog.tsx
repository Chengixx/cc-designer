import { defineComponent } from "vue";
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
} from "vuetify/components";

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
        <VDialog {...renderProps} onAfterLeave={handleLeave}>
          <VCard minHeight={"85vh"} minWidth={"50vw"}>
            {/* 标题,有才显示,为了兼容element */}
            {props.title && (
              <VCardTitle class="c-flex c-justify-between c-items-center">
                <div>{props.title}</div>
                <div>X</div>
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
