import { Delete } from "@element-plus/icons-vue";
import { ElIcon, ElTooltip } from "element-plus";
import { defineComponent, inject } from "vue";
const ButtonTool = defineComponent({
  setup() {
    const commands: Record<string, Function> | undefined = inject("commands");

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      commands!.delete();
    };

    return () => {
      return (
        <div
          class="absolute bottom-0 right-1 cursor-pointer"
          onClick={(e: MouseEvent) => handleClick(e)}
        >
          <ElTooltip
            class="box-item"
            effect="dark"
            content="删除组件"
            placement="bottom"
          >
            <ElIcon>
              <Delete />
            </ElIcon>
          </ElTooltip>
        </div>
      );
    };
  },
});
export default ButtonTool;
