import { Delete, DocumentCopy, Top } from "@element-plus/icons-vue";
import { ElIcon, ElTooltip } from "element-plus";
import { computed, defineComponent, inject } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { deepClone, getRandomId } from "@cgx-designer/utils";
import {
  noCopyDomList,
  findHigherLevelDomList,
} from "../../../../../constant/index";

const ButtonTool = defineComponent({
  setup() {
    const commands: Record<string, Function> | undefined = inject("commands");
    const focusManage = inject("focusManage") as FocusManage;
    const elementManage = inject("elementManage") as ElementManage;

    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      const newElementSchema = elementManage.deepCopyElement(deepClone(focusManage.focusedElement.value!))
      commands!.handleLastAdd(newElementSchema)
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      focusManage.startFocusTimedQuery();
      const id = focusManage.focusedElement.value?.id;
      commands!.handleDelete(id);
      focusManage.stopFocusTimedQuery();
    };

    const handleTop = (e: MouseEvent) => {
      e.stopPropagation();
      const id = focusManage.focusedElement.value?.id;
      const parentDom = elementManage.findParentElementById(id!);
      focusManage.handleFocus(parentDom!);
    };

    const elementTag = computed(() => {
      return (
        focusManage.focusedElement.value?.key +
        "—" +
        focusManage.focusedElement.value?.id
      );
    });

    return () => {
      return (
        <div class="c-absolute c-bottom-1 c-right-1 c-cursor-pointer c-flex">
          <div class="c-mr-1 c-flex c-items-center c-text-xs c-text-gray-500 c-pointer-events-none">
            {elementTag.value}
          </div>
          <div class="c-pointer-events-auto c-flex c-items-center">
            {!noCopyDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <ElTooltip effect="dark" content="复制组件" placement="bottom">
                <div
                  class="c-mr-1 c-flex c-items-center"
                  onClick={(e: MouseEvent) => handleCopy(e)}
                >
                  <ElIcon>
                    <DocumentCopy />
                  </ElIcon>
                </div>
              </ElTooltip>
            )}
            {findHigherLevelDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <ElTooltip effect="dark" content="父级元素" placement="bottom">
                <div
                  class="c-mr-1 c-flex c-items-center"
                  onClick={(e: MouseEvent) => handleTop(e)}
                >
                  <ElIcon>
                    <Top />
                  </ElIcon>
                </div>
              </ElTooltip>
            )}
            <ElTooltip effect="dark" content="删除组件" placement="bottom">
              <div
                onClick={(e: MouseEvent) => handleDelete(e)}
                class="c-flex c-items-center"
              >
                <ElIcon>
                  <Delete />
                </ElIcon>
              </div>
            </ElTooltip>
          </div>
        </div>
      );
    };
  },
});
export default ButtonTool;
