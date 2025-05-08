import { computed, defineComponent, inject, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import { elementController } from "@cgx-designer/controller";
import ModeButtonGroup from "./ModeButtonGroup";

type ButtonType =
  | ""
  | "default"
  | "text"
  | "primary"
  | "success"
  | "warning"
  | "info"
  | "danger";

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
  const Button = elementController.getElementRender("button");
  const renderProps = {
    icon:
      elementController.getCurrentElementLibraryName() !== "vuetify" &&
      Iconfig.icon,
    variant: "outlined",
    onClick: Iconfig.handler,
    disabled,
    type,
    size: "small",
  };
  return (
    <>
      {showLabel ? (
        <Button {...renderProps}>
          {{
            prepend: () => {
              return <Iconfig.icon class="c-h-4 c-w-4 dark:c-fill-white" />;
            },
            default: () => {
              return <span>{Iconfig.label}</span>;
            },
          }}
        </Button>
      ) : (
        <Button {...renderProps}>
          {{
            prepend: () => {
              return <Iconfig.icon class="c-h-4 c-w-4 dark:c-fill-white" />;
            },
          }}
        </Button>
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
    const { Message, Clear, Undo, Redo, Export, Import, Preview } = buttonMap;

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
        <div class="c-h-[40px] c-flex c-items-center c-border-y c-bg-white c-border-gray-200 dark:c-bg-darkMode dark:c-border-darkMode">
          <div class="c-h-full c-flex c-justify-center c-items-center c-py-2">
            <div class="c-h-full c-border-r c-px-4 c-flex c-justify-center c-items-center dark:c-border-[#3e434c] ">
              <ModeButtonGroup />
            </div>
          </div>
          <div class="c-h-full c-flex-1 c-flex c-items-center c-gap-x-4 c-pl-4">
            {Icon(Undo, undoDisabled.value)}
            {Icon(Redo, redoDisabled.value)}
            <Icon {...Clear} />
            <Icon {...Message} />
          </div>
          <div
            class={[
              "c-h-full c-flex-1 c-flex c-justify-end c-items-center c-pr-4",
              elementController.getCurrentElementLibraryName() === "vuetify" &&
                "c-gap-x-2",
            ]}
          >
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
