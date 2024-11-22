import { defineComponent, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import { ElButton } from "element-plus";

const Icon = (Iconfig: OperationButtonSetting) => {
  return (
    <div title={Iconfig.label}>
      <Iconfig.icon
        class="h-5 w-5 hover:fill-blue-500 cursor-pointer"
        onclick={Iconfig.handler}
      />
    </div>
  );
};

const OperationMenu = defineComponent({
  props: {
    buttonMap: {
      type: Object as PropType<Record<string, OperationButtonSetting>>,
      required: true,
    },
  },
  setup({ buttonMap }) {
    const { Message, Tree, Clear, Undo, Redo, Export, Import, Preview } =
      buttonMap;

    return () => {
      return (
        <div class="h-12 flex items-center px-8 border bg-white border-blue-100">
          {/* 重做和撤销 */}
          <div class="h-full flex-1 flex items-center gap-x-4">
            <Icon {...Undo} />
            <Icon {...Redo} />
            <Icon {...Clear} />
            <ElButton icon={Tree.icon} onClick={Tree.handler} />
            <Icon {...Message} />
          </div>
          <div class="h-full flex-1 flex justify-end items-center">
            <ElButton icon={Import.icon} onClick={Import.handler}>
              <span>{Import.label}</span>
            </ElButton>
            <ElButton icon={Export.icon} onClick={Export.handler}>
              <span>{Export.label}</span>
            </ElButton>
            <ElButton icon={Preview.icon} onClick={Preview.handler}>
              <span>{Preview.label}</span>
            </ElButton>
          </div>
          {/* 其他操作 */}
        </div>
      );
    };
  },
});
export default OperationMenu;
