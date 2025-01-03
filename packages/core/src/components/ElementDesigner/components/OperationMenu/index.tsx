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
          "c-h-5 c-w-5",
          disabled
            ? "c-fill-gray-500 c-cursor-not-allowed"
            : "dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer",
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
        <div class="c-h-12 c-flex c-items-center c-border-y c-bg-white c-border-gray-200 dark:c-bg-darkMode dark:c-border-darkMode">
          <div class="c-h-full c-flex c-justify-center c-items-center c-py-2">
            <div class="c-border-r c-px-4 c-flex c-justify-center c-items-center dark:c-border-[#3e434c]">
              <ElRadioGroup v-model={modeComputed.value} size="small">
                <ElRadioButton label="Pc" value="pc" />
                <ElRadioButton label="Pad" value="ipad" />
                <ElRadioButton label="Pe" value="pe" />
              </ElRadioGroup>
            </div>
          </div>
          <div class="c-h-full c-flex-1 c-flex c-items-center c-gap-x-4 c-pl-4">
            {Icon(Undo, undoDisabled.value)}
            {Icon(Redo, redoDisabled.value)}
            <Icon {...Clear} />
            <Icon {...Message} />
          </div>
          <div class="c-h-full c-flex-1 c-flex c-justify-end c-items-center c-pr-4">
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
