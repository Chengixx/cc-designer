import { FocusManage, HoverManage } from "@cgx-designer/hooks";
import { defineComponent, inject, onMounted, ref } from "vue";

const PanelWidget = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const hoverManage = inject("hoverManage") as HoverManage;
    const hoverWidgetRef = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      hoverManage.sethoverWidgetRef(hoverWidgetRef.value!);
    });

    return () => {
      return (
        //hover的widget
        <div
          v-show={
            hoverManage.showHoverBox.value &&
            hoverManage.hoverElementId.value !==
              focusManage.focusedElement.value?.id
          }
          ref={hoverWidgetRef}
          class="absolute z-50 border border-dashed border-blue-500 pointer-events-none transition-all"
        />
      );
    };
  },
});
export default PanelWidget;
