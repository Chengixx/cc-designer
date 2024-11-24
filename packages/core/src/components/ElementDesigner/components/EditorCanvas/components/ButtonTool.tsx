import { Delete, DocumentCopy } from "@element-plus/icons-vue";
import { ElIcon, ElTooltip } from "element-plus";
import { computed, defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { deepClone, getRandomId } from "@cgx-designer/utils";
import { noCopyDomList } from "../../../../../constant/index";

const ButtonTool = defineComponent({
  setup() {
    const commands: Record<string, Function> | undefined = inject("commands");
    const focusManage = inject("focusManage") as FocusManage;

    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      const id = getRandomId();
      commands!.handleLastAdd(
        deepClone({
          ...focusManage.focusedElement.value,
          id,
          field: focusManage.focusedElement.value?.key + "-" + id,
        })
      );
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      focusManage.startFocusTimedQuery();
      const id = focusManage.focusedElement.value?.id;
      commands!.handleDelete(id);
      focusManage.stopFocusTimedQuery();
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
        <div class="absolute bottom-1 right-1 cursor-pointer flex">
          <div class="mr-1 flex items-center text-xs text-gray-500 pointer-events-none">
            {elementTag.value}
          </div>
          <div class="pointer-events-auto flex items-center">
            {!noCopyDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <ElTooltip effect="dark" content="复制组件" placement="bottom">
                <div
                  class="mr-1 flex items-center"
                  onClick={(e: MouseEvent) => handleCopy(e)}
                >
                  <ElIcon>
                    <DocumentCopy />
                  </ElIcon>
                </div>
              </ElTooltip>
            )}
            <ElTooltip effect="dark" content="删除组件" placement="bottom">
              <div
                onClick={(e: MouseEvent) => handleDelete(e)}
                class="flex items-center"
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
