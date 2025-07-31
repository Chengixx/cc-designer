import { FocusManage, HoverManage } from "@cgx-designer/hooks";
import { defineComponent, inject, onMounted, ref } from "vue";
import ButtonTool from "../ButtonTool";

const PanelWidget = defineComponent({
  setup() {
    const hoverWidgetRef = ref<HTMLDivElement | null>(null);
    const focusWidgetRef = ref<HTMLDivElement | null>(null);
    const focusManager = inject("focusManager") as FocusManage;
    const hoverManager = inject("hoverManager") as HoverManage;
    onMounted(() => {
      focusManager.setFocusWidgetRef(focusWidgetRef.value!);
      hoverManager.setHoverWidgetRef(hoverWidgetRef.value!);
    });

    return () => (
      <>
        {/* focus的widget */}
        <div
          v-show={focusManager.focusedElement.value !== null}
          ref={focusWidgetRef}
          class={[
            "c-absolute c-z-20 c-border c-border-solid c-border-blue-400 c-pointer-events-none c-bg-[rgba(62,139,242,.06)]",
            focusManager.focusTransition.value
              ? "c-transition-all"
              : "c-transition-none",
          ]}
        >
          <ButtonTool />
        </div>
        {/* hover的widget */}
        <div
          v-show={
            hoverManager.showHoverBox.value &&
            hoverManager.hoveredElement.value?.id !==
              focusManager.focusedElement.value?.id
          }
          ref={hoverWidgetRef}
          class="c-absolute c-z-20 c-border c-border-dashed c-border-blue-300 c-pointer-events-none c-transition-all"
        />
      </>
    );
  },
});
export default PanelWidget;
