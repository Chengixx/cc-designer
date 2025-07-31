import { computed, defineComponent, inject, nextTick, ref, watch } from "vue";
import {
  ElementManage,
  FocusManage,
  HoverManage,
  QueueManage,
} from "@cgx-designer/hooks";
import { deepClone } from "@cgx-designer/utils";
import { ClearIcon, CopyIcon, TopIcon } from "@cgx-designer/icons";
import { noCopyDomList, findHigherLevelDomList } from "../../../constant/index";
import { elementController } from "@cgx-designer/controller";
import { IElementSchema } from "@cgx-designer/types";

const ButtonTool = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;
    const queueManage = inject("queueManage") as QueueManage;

    const position = ref<"top" | "bottom">("top");
    const TOOL_HEIGHT = 28;
    const isHover = ref(false);

    // 更新操作条位置
    const updateToolPosition = () => {
      const el = focusManage.focusedElementDom.value;
      if (!el) return;

      nextTick(() => {
        const rect = el.getBoundingClientRect();
        position.value = rect.top < 120 ? "bottom" : "top";
      });
    };

    watch(() => focusManage.focusedElementDom.value, updateToolPosition, {
      immediate: true,
    });

    watch(() => focusManage.focusWidgetRect.value, updateToolPosition);

    const toolStyle = computed(() => {
      return position.value === "top"
        ? { top: `-${TOOL_HEIGHT}px`, bottom: undefined }
        : {
            top: undefined,
            bottom: `-${TOOL_HEIGHT * elementTree.value.length}px`,
          };
    });

    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      const newElementSchema = elementManage.deepCopyElement(
        deepClone(focusManage.focusedElement.value!)
      );
      elementManage.addElementFromLast(newElementSchema as IElementSchema);
      focusManage.handleFocus(newElementSchema as IElementSchema);
      queueManage.push("copy");
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      focusManage.startFocusTimedQuery();
      const id = focusManage.focusedElement.value?.id;
      elementManage.deleteElementById(id!);
      focusManage.resetFocus();
      queueManage.push("delete");
      focusManage.stopFocusTimedQuery();
    };

    const handleTop = (e: MouseEvent) => {
      e.stopPropagation();
      const id = focusManage.focusedElement.value?.id;
      const parentDom = elementManage.getParentElementById(id!);
      focusManage.handleFocus(parentDom!);
    };

    const elementTree = computed(() => {
      const innerTree = elementManage.getElementTreePathById(
        focusManage.focusedElement.value?.id!
      );
      return isHover.value ? innerTree : innerTree.slice(-1);
    });

    return () => (
      <div
        class="c-absolute c-right-1 c-cursor-pointer c-flex"
        style={toolStyle.value}
      >
        {/* 组件信息 */}
        <div
          class="c-mr-1 c-flex c-flex-col c-gap-y-1 c-items-center c-pointer-events-auto c-whitespace-nowrap"
          onMouseenter={() => (isHover.value = true)}
          onMouseleave={() => (isHover.value = false)}
        >
          {elementTree.value.length &&
            elementTree.value.reverse().map((elementSchema) => {
              const elmentConfig = elementController.getElementConfig(
                elementSchema.key
              );
              const ElementIcon = elmentConfig.icon;
              const elementTag = elmentConfig.label;
              return (
                <div
                  class="c-w-full c-flex c-gap-x-1 c-p-1 c-bg-blue-500 c-rounded c-text-xs c-text-white"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    focusManage.handleFocus(elementSchema);
                  }}
                  onMouseenter={(e: MouseEvent) => {
                    hoverManage.handleHover(e, elementSchema);
                  }}
                  onMouseleave={(e: MouseEvent) => {
                    e.stopPropagation();
                    hoverManage.setHoveredElement();
                  }}
                >
                  <ElementIcon class="c-w-[16px] c-h-[16px] c-fill-white" />
                  {elementTag}
                </div>
              );
            })}
        </div>
        {/* 操作按钮 */}
        <div class="c-pointer-events-auto c-bg-blue-500 c-flex c-items-center c-overflow-hidden c-h-6">
          {!noCopyDomList.includes(focusManage.focusedElement.value?.key!) && (
            <div
              onClick={(e: MouseEvent) => handleCopy(e)}
              title="复制组件"
              class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-w-fit c-p-1 c-flex c-justify-center c-items-center"
            >
              <CopyIcon class="c-w-[13px] c-h-[13px] c-fill-white" />
            </div>
          )}
          {findHigherLevelDomList.includes(
            focusManage.focusedElement.value?.key!
          ) && (
            <div
              onClick={(e: MouseEvent) => handleTop(e)}
              title="父级元素"
              class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-w-fit c-p-1 c-flex c-justify-center c-items-center"
            >
              <TopIcon class="c-w-[13px] c-h-[13px] c-fill-white" />
            </div>
          )}
          <div
            onClick={(e: MouseEvent) => handleDelete(e)}
            title="删除组件"
            class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-w-fit c-p-1 c-flex c-justify-center c-items-center"
          >
            <ClearIcon class="c-w-[13px] c-h-[13px] c-fill-white" />
          </div>
        </div>
      </div>
    );
  },
});
export default ButtonTool;
