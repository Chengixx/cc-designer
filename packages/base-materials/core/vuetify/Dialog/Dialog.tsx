import { defineComponent, inject } from "vue";
import {
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VDialog,
} from "vuetify/components";
import { CloseIcon } from "@cgx-designer/icons";
import { ThemeManage, useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const Dialog = defineComponent({
  props: createElementProps(),
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { attrs, slots, emit }) {
    const themeManager = inject("themeManager") as ThemeManage;
    const handleLeave = () => {
      emit("update:modelValue", false);
    };
    const renderProps = useMergeAttr(props, attrs);
    return () => (
      <VDialog
        {...renderProps}
        onAfterLeave={handleLeave}
        width="auto"
        style={{
          marginTop: "0vh !important",
        }}
      >
        <VCard
          minHeight={"80vh"}
          minWidth={"50vw"}
          maxWidth={"50vw"}
          color={themeManager.isDark.value ? "#141414" : "#fff"}
        >
          {/* 标题,有才显示,为了兼容element */}
          {renderProps.title && (
            <VCardTitle class="c-flex c-justify-between c-items-center">
              <span class="c-text-base c-font-medium">{renderProps.title}</span>
              <div
                class="c-h-fit c-w-fit c-cursor-pointer"
                onClick={handleLeave}
              >
                <CloseIcon class="c-w-5 c-h-5 c-fill-gray-500 hover:c-fill-blue-500" />
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
  },
});

export default Dialog;
