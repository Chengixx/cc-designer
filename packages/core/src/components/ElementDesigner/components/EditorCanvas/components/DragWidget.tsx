import { IEditorElement } from "../../../../../types";
import { FocusManage } from "@cgx-designer/hooks";
import { DragIcon } from "@cgx-designer/icons";
import { useWindowSize } from "@vueuse/core";
import { computed, defineComponent, inject, PropType, ref, watch } from "vue";

const DragWidget = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    const focusManage = inject("focusManage") as FocusManage;
    const widgetRef = ref<HTMLElement | null>(null);
    const { width: windowWidth } = useWindowSize();
    const isDragWidgetHovered = ref<boolean>(false);
    const handleClick = (e: MouseEvent) => {
      focusManage.handleFocus(props.elementSchema, e);
    };
    const computedWidgetLeftValue = () => {
      if (focusManage.focusedElement.value?.key === "col") {
        if (!focusManage.focusedElementDom.value) return "0px";
        const parentElement = focusManage.focusedElementDom.value.parentElement;
        const parentRect = parentElement.getBoundingClientRect();
        const focusWidgetRect =
          focusManage.focusedElementDom.value.getBoundingClientRect();
        return focusWidgetRect.left - parentRect.left + "px";
      } else {
        return "0px";
      }
    };
    const widgetLeftValue = computed(computedWidgetLeftValue);

    watch(
      () => windowWidth.value,
      () => {
        const left = computedWidgetLeftValue();
        if (widgetRef.value) {
          widgetRef.value.style.left = left;
        }
      },
      { immediate: true }
    );
    return () => {
      return (
        <div
          ref={widgetRef}
          class={[
            "c-absolute c-z-10 c-top-0 c-h-6 c-p-1 c-flex c-gap-x-1 c-justify-center c-items-center c-cursor-move c-rounded-br-sm c-transition-all",
            isDragWidgetHovered.value
              ? "c-bg-[#409eff]"
              : "c-bg-[rgba(64,158,255,.3)]",
          ]}
          style={{
            left: widgetLeftValue.value,
          }}
          onClick={handleClick}
          onMouseover={(e) => e.stopPropagation()}
          onMouseout={(e) => e.stopPropagation()}
          onMouseenter={() => (isDragWidgetHovered.value = true)}
          onMouseleave={() => (isDragWidgetHovered.value = false)}
        >
          <DragIcon class="c-fill-white c-w-4 c-h-4" />
          <span class="c-text-white">{props.elementSchema.key}</span>
        </div>
      );
    };
  },
});
export default DragWidget;
