import { FocusManage, HoverManage } from "@cgx-designer/hooks";
import { defineComponent, inject, onMounted, ref } from "vue";
import ButtonTool from "./ButtonTool";

const PanelWidget = defineComponent({
  setup() {
    const hoverWidgetRef = ref<HTMLDivElement | null>(null);
    const focusWidgetRef = ref<HTMLDivElement | null>(null);
    const focusManage = inject("focusManage") as FocusManage;
    const hoverManage = inject("hoverManage") as HoverManage;
    onMounted(() => {
      focusManage.setFocusWidgetRef(focusWidgetRef.value!);
      hoverManage.setHoverWidgetRef(hoverWidgetRef.value!);
    });

    return () => {
      return (
        <>
          {/* focus的widget */}
          <div
            v-show={focusManage.focusedElement.value !== null}
            ref={focusWidgetRef}
            class={[
              "c-absolute c-z-20 c-border c-border-solid c-border-blue-400 c-pointer-events-none c-bg-[rgba(62,139,242,.06)]",
              focusManage.focusTransition.value
                ? "c-transition-all"
                : "c-transition-none",
            ]}
          >
            <ButtonTool />
          </div>
          {/* hover的widget */}
          <div
            v-show={
              hoverManage.showHoverBox.value &&
              hoverManage.hoveredElement.value?.id !==
                focusManage.focusedElement.value?.id
            }
            ref={hoverWidgetRef}
            class="c-absolute c-z-20 c-border c-border-dashed c-border-blue-300 c-pointer-events-none c-transition-all"
          />
        </>
      );
    };
  },
});
export default PanelWidget;
