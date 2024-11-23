import { defineComponent, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import { ElButton, ButtonType } from "element-plus";

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

const IconButton = (
  Iconfig: OperationButtonSetting,
  showLabel: boolean = false,
  disabled: boolean = false,
  type: ButtonType = ""
) => {
  return (
    <>
      {showLabel ? (
        <ElButton
          icon={Iconfig.icon}
          onClick={Iconfig.handler}
          disabled={disabled}
          type={type}
        >
          <span>{Iconfig.label}</span>
        </ElButton>
      ) : (
        <ElButton
          icon={Iconfig.icon}
          onClick={Iconfig.handler}
          disabled={disabled}
          type={type}
        />
      )}
    </>
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
        <div class="h-12 flex items-center px-8 border-y bg-white border-gray-200">
          <div class="h-full flex-1 flex items-center gap-x-4">
            <Icon {...Undo} />
            <Icon {...Redo} />
            <Icon {...Clear} />
            <Icon {...Message} />
          </div>
          <div class="h-full flex-1 flex justify-end items-center">
            {IconButton(Tree, true)}
            {IconButton(Import, true)}
            {IconButton(Export, true)}
            {IconButton(Preview, true)}
          </div>
        </div>
      );
    };
  },
});
export default OperationMenu;
