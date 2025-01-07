import { IEditorElement } from "../../../../../types";
import { FocusManage } from "@cgx-designer/hooks";
import { DragIcon } from "@cgx-designer/icons";
import { defineComponent, inject, PropType, ref } from "vue";

const DragWidget = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    const focusManage = inject("focusManage") as FocusManage;
    const isDragWidgetHovered = ref<boolean>(false);
    const handleClick = (e: MouseEvent) => {
      focusManage.handleFocus(props.elementSchema, e);
    };
    return () => {
      return (
        <div
          class={[
            "c-absolute c-z-10 c-top-0 c-left-0 c-h-6 c-p-1 c-flex c-gap-x-1 c-justify-center c-items-center c-cursor-move c-rounded-br-sm c-transition-all",
            isDragWidgetHovered.value
              ? "c-bg-[#409eff]"
              : "c-bg-[rgba(64,158,255,.3)]",
          ]}
          onClick={handleClick}
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
