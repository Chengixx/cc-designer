import { Delete, DocumentCopy } from "@element-plus/icons-vue";
import { ElIcon, ElTooltip } from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
const ButtonTool = defineComponent({
  setup() {
    const commands: Record<string, Function> | undefined = inject("commands");
    const focusManage = inject("focusManage") as FocusManage;

    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      commands!.addFromLast(focusManage.focusedElement.value);
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      commands!.delete();
    };

    return () => {
      return (
        <div class="absolute bottom-0 right-1 cursor-pointer flex">
          <ElTooltip effect="dark" content="复制组件" placement="bottom">
            <div class="mr-1" onClick={(e: MouseEvent) => handleCopy(e)}>
              <ElIcon>
                <DocumentCopy />
              </ElIcon>
            </div>
          </ElTooltip>
          <ElTooltip effect="dark" content="删除组件" placement="bottom">
            <div onClick={(e: MouseEvent) => handleDelete(e)}>
              <ElIcon>
                <Delete />
              </ElIcon>
            </div>
          </ElTooltip>
        </div>
      );
    };
  },
});
export default ButtonTool;
