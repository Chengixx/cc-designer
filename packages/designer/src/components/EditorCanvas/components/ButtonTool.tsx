import { computed, defineComponent, inject } from "vue";
import { ElementManage, FocusManage, QueueManage } from "@cgx-designer/hooks";
import { deepClone } from "@cgx-designer/utils";
import { ClearIcon, CopyIcon, TopIcon } from "@cgx-designer/icons";
import { noCopyDomList, findHigherLevelDomList } from "../../../constant/index";
import { elementController } from "@cgx-designer/controller";
import { IEditorElement } from "@cgx-designer/types";

const ButtonTool = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const elementManage = inject("elementManage") as ElementManage;
    const queueManage = inject("queueManage") as QueueManage;
    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      const newElementSchema = elementManage.deepCopyElement(
        deepClone(focusManage.focusedElement.value!)
      );
      elementManage.addElementFromLast(newElementSchema as IEditorElement);
      focusManage.handleFocus(newElementSchema as IEditorElement);
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      focusManage.startFocusTimedQuery();
      const id = focusManage.focusedElement.value?.id;
      elementManage.deleteElementById(id!);
      focusManage.resetFocus();
      focusManage.stopFocusTimedQuery();
    };

    const handleTop = (e: MouseEvent) => {
      e.stopPropagation();
      const id = focusManage.focusedElement.value?.id;
      const parentDom = elementManage.getParentElementById(id!);
      focusManage.handleFocus(parentDom!);
    };

    const elementTag = computed(() => {
      if (!focusManage.focusedElement.value) return "";
      return elementController.getElementConfig(
        focusManage.focusedElement.value?.key!
      ).label;
    });

    return () => {
      return (
        <div class="c-absolute c-bottom-1 c-right-1 c-cursor-pointer c-flex">
          <div class="c-mr-1 c-flex c-items-center c-text-xs c-text-gray-500 c-pointer-events-none">
            {elementTag.value}
          </div>
          <div class="c-pointer-events-auto c-flex c-items-center c-gap-x-1">
            {!noCopyDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <div onClick={(e: MouseEvent) => handleCopy(e)} title="复制组件">
                <CopyIcon class="c-w-[16px] c-h-[16px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
              </div>
            )}
            {findHigherLevelDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <div onClick={(e: MouseEvent) => handleTop(e)} title="父级元素">
                <TopIcon class="c-w-[18px] c-h-[18px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
              </div>
            )}
            <div onClick={(e: MouseEvent) => handleDelete(e)} title="删除组件">
              <ClearIcon class="c-w-[16px] c-h-[16px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
            </div>
          </div>
        </div>
      );
    };
  },
});
export default ButtonTool;
