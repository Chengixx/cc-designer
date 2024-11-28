import { computed, defineComponent, inject, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import { ElButton, ButtonType } from "element-plus";
import { ToLeftIcon, ToRightIcon } from "@cgx-designer/icons";
import { CollapseManage, FocusManage } from "@cgx-designer/hooks";

const Icon = (Iconfig: OperationButtonSetting, disabled: boolean = false) => {
  return (
    <div title={Iconfig.label}>
      <Iconfig.icon
        class={[
          "h-5 w-5 cursor-pointer",
          disabled
            ? "fill-gray-500 cursor-not-allowed"
            : "dark:fill-white hover:fill-blue-500 dark:hover:fill-blue-500",
        ]}
        onclick={!disabled ? Iconfig.handler : undefined}
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
    const commandManage = inject("commandManage") as any;
    const collapseManage = inject("collapseManage") as CollapseManage;
    const focusManage = inject("focusManage") as FocusManage;
    const { Message, Tree, Clear, Undo, Redo, Export, Import, Preview } =
      buttonMap;

    const undoDisabled = computed(() => {
      if (commandManage.queue?.length === 0) {
        return true;
      }
      if (commandManage.queue?.length > 0 && commandManage.current === -1) {
        return true;
      }
      return false;
    });
    const RedoDisabled = computed(() => {
      if (commandManage.queue?.length === 0) {
        return true;
      }
      if (
        commandManage.queue?.length > 0 &&
        commandManage.current === commandManage.queue?.length - 1
      ) {
        return true;
      }
      return false;
    });

    return () => {
      return (
        <div class="h-12 flex items-center border-y bg-white border-gray-200 dark:bg-darkMode dark:border-darkMode">
          <div
            title="收起/打开左侧菜单"
            class="h-full min-w-[24px] cursor-pointer flex justify-center items-center border-r border-gray-200 hover:bg-[#f4f8fe] dark:border-darkMode dark:hover:bg-[#2d2d2d]"
            onClick={() => {
              focusManage.startFocusTimedQuery();
              collapseManage.toggleLeftMenu();
              setTimeout(() => {
                focusManage.stopFocusTimedQuery();
              }, 350);
            }}
          >
            {collapseManage.leftMenuCollapseState.value ? (
              <ToLeftIcon class="w-[18px] h-[18px] dark:fill-white" />
            ) : (
              <>
                <span class="mx-2">组件菜单</span>
                <ToRightIcon class="w-[18px] h-[18px] mr-2 dark:fill-white" />
              </>
            )}
          </div>
          <div class="h-full flex-1 flex items-center gap-x-4 pl-4">
            {Icon(Undo, undoDisabled.value)}
            {Icon(Redo, RedoDisabled.value)}
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
            class="h-full min-w-[24px] cursor-pointer flex items-center justify-center border-l border-gray-200 hover:bg-[#f4f8fe] dark:border-darkMode dark:hover:bg-[#2d2d2d]"
            onClick={() => {
              focusManage.startFocusTimedQuery();
              collapseManage.toggleRightMenu();
              setTimeout(() => {
                focusManage.stopFocusTimedQuery();
              }, 350);
            }}
          >
            {collapseManage.rightMenuCollapseState.value ? (
              <ToRightIcon class="w-[18px] h-[18px] dark:fill-white" />
            ) : (
              <>
                <ToLeftIcon class="w-[18px] h-[18px] ml-2 dark:fill-white" />
                <span class="mx-2">配置菜单</span>
              </>
            )}
          </div>
        </div>
      );
    };
  },
});
export default OperationMenu;
