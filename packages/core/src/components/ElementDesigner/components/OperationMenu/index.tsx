import { defineComponent, inject, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import { ElButton, ButtonType } from "element-plus";
import { ToLeftIcon, ToRightIcon } from "@cgx-designer/icons";
import { CollapseManage } from "@cgx-designer/hooks";

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
    const collapseManage = inject("collapseManage") as CollapseManage;
    const { Message, Tree, Clear, Undo, Redo, Export, Import, Preview } =
      buttonMap;

    return () => {
      return (
        <div class="h-12 flex items-center border-y bg-white border-gray-200">
          <div
            title="收起/打开左侧菜单"
            class="h-full w-[24px] cursor-pointer flex justify-center items-center border-r border-gray-200 hover:bg-[#f4f8fe]"
            onClick={collapseManage.toggleLeftMenu}
          >
            {collapseManage.leftMenuCollapseState.value ? (
              <ToLeftIcon class="w-[18px] h-[18px]" />
            ) : (
              <ToRightIcon class="w-[18px] h-[18px]" />
            )}
          </div>
          <div class="h-full flex-1 flex items-center gap-x-4 pl-4">
            <Icon {...Undo} />
            <Icon {...Redo} />
            <Icon {...Clear} />
            <Icon {...Message} />
          </div>
          <div class="h-full flex-1 flex justify-end items-center pr-4">
            {IconButton(Tree, true)}
            {IconButton(Import, true)}
            {IconButton(Export, true)}
            {IconButton(Preview, true)}
          </div>
          <div
            title="收起/打开右侧菜单"
            class="h-full w-[24px] cursor-pointer flex items-center justify-center  border-l border-gray-200 hover:bg-[#f4f8fe]"
            onClick={collapseManage.toggleRightMenu}
          >
            {collapseManage.rightMenuCollapseState.value ? (
              <ToRightIcon class="w-[18px] h-[18px]" />
            ) : (
              <ToLeftIcon class="w-[18px] h-[18px]" />
            )}
          </div>
        </div>
      );
    };
  },
});
export default OperationMenu;
