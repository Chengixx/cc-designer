import { computed, defineComponent, inject, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import {
  ElButton,
  ButtonType,
  ElRadioGroup,
  ElRadioButton,
} from "element-plus";
import { FocusManage, ModeManage } from "@cgx-designer/hooks";

const Icon = (Iconfig: OperationButtonSetting, disabled: boolean = false) => {
  const handleClick = () => {
    if (!disabled) {
      Iconfig.handler!();
    }
  };

  return (
    <div title={Iconfig.label}>
      <Iconfig.icon
        class={[
          "h-5 w-5",
          disabled
            ? "fill-gray-500 cursor-not-allowed"
            : "dark:fill-white hover:fill-blue-500 dark:hover:fill-blue-500 cursor-pointer",
        ]}
        onclick={handleClick}
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
          size="small"
        >
          <span>{Iconfig.label}</span>
        </ElButton>
      ) : (
        <ElButton
          icon={Iconfig.icon}
          onClick={Iconfig.handler}
          disabled={disabled}
          type={type}
          size="small"
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
    const modeManage = inject("modeManage") as ModeManage;
    const focusManage = inject("focusManage") as FocusManage;
    const { Message, Tree, Clear, Undo, Redo, Export, Import, Preview } =
      buttonMap;

    const modeComputed = computed({
      get() {
        return modeManage.mode.value;
      },
      set(nv) {
        focusManage.startFocusTimedQuery();
        modeManage.setMode(nv);
        setTimeout(() => {
          focusManage.stopFocusTimedQuery();
        }, 350);
      },
    });

    const undoDisabled = computed(() => {
      const { queue, current } = commandManage;
      return queue?.length === 0 || (queue?.length > 0 && current === -1);
    });

    const redoDisabled = computed(() => {
      const { queue, current } = commandManage;
      return (
        queue?.length === 0 ||
        (queue?.length > 0 && current === queue.length - 1)
      );
    });

    return () => {
      return (
        <div class="h-12 flex items-center border-y bg-white border-gray-200 dark:bg-darkMode dark:border-darkMode">
          <div class="h-full flex justify-center items-center py-2">
            <div class="border-r px-4 flex justify-center items-center dark:border-[#3e434c]">
              <ElRadioGroup v-model={modeComputed.value} size="small">
                <ElRadioButton label="Pc" value="pc" />
                <ElRadioButton label="Pad" value="ipad" />
                <ElRadioButton label="Pe" value="pe" />
              </ElRadioGroup>
            </div>
          </div>
          <div class="h-full flex-1 flex items-center gap-x-4 pl-4">
            {Icon(Undo, undoDisabled.value)}
            {Icon(Redo, redoDisabled.value)}
            <Icon {...Clear} />
            <Icon {...Message} />
          </div>
          <div class="h-full flex-1 flex justify-end items-center pr-4">
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
