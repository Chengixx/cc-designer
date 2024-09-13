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
      hoverManage.sethoverWidgetRef(hoverWidgetRef.value!);
    });

    return () => {
      return (
        <>
          {/* focus的widget */}
          <div
            v-show={focusManage.focusedElement.value !== null}
            ref={focusWidgetRef}
            class="absolute z-20 border boreder-dashed border-blue-700 pointer-events-none transition-all bg-[#f4f8fe] opacity-50"
          >
            <ButtonTool />
          </div>
          {/* hover的widget */}
          <div
            v-show={
              hoverManage.showHoverBox.value &&
              hoverManage.hoverElementId.value !==
                focusManage.focusedElement.value?.id
            }
            ref={hoverWidgetRef}
            class="absolute z-20 border border-dashed border-blue-500 pointer-events-none transition-all"
          />
        </>
      );
    };
  },
});
export default PanelWidget;
