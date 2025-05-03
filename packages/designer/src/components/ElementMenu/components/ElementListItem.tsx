import { SvgIcon } from "@cgx-designer/extensions";
import { elementController } from "@cgx-designer/controller";
import { getRandomId } from "@cgx-designer/utils";
import { defineComponent, inject, ref } from "vue";

export const ElementListBarItem = defineComponent({
  props: {
    element: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const commands: Record<string, Function> | undefined = inject("commands");
    const isHovered = ref<boolean>(false);
    const handleClick = () => {
      const newElementSchema = props.element.template(getRandomId);
      commands!.handleLastAdd(newElementSchema);
    };

    return () => (
      <div
        class="c-relative c-w-full c-h-[36px] c-mt-2 c-flex c-justify-start c-items-center c-py-1 c-px-[8px] c-bg-white c-box-border c-cursor-move c-select-none c-rounded c-border c-border-[#d9d9d9] hover:c-border-blue-500 hover:c-bg-[#f4f8fe] dark:c-bg-darkMode dark:hover:c-bg-[#272b32] dark:c-border-darkMode"
        onClick={handleClick}
        onMouseenter={() => (isHovered.value = true)}
        onMouseleave={() => (isHovered.value = false)}
        v-ripple={{ class: "c-text-blue-300" }}
      >
        <ElementListItemIcon
          element={props.element}
          isHovered={isHovered.value}
        />
        <span
          class={["c-text-sm c-ml-1", isHovered.value && "c-text-blue-500"]}
        >
          {props.element.label}
        </span>
      </div>
    );
  },
});
export const ElementListBoxItem = defineComponent({
  props: {
    element: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const commands: Record<string, Function> | undefined = inject("commands");
    const isHovered = ref<boolean>(false);
    const handleClick = () => {
      const newElementSchema = props.element.template(getRandomId);
      commands!.handleLastAdd(newElementSchema);
    };

    return () => (
      <div
        class="c-relative c-transition-all c-w-full c-h-28 c-p-3 c-flex c-flex-col c-justify-between c-items-center c-bg-white c-box-border c-cursor-move c-select-none c-border-r c-border-b c-border-[#d9d9d9] hover:c-shadow-commonShadow dark:hover:c-shadow-commonShadowDark dark:c-bg-darkMode dark:c-border-darkMode"
        style={{
          zIndex: isHovered.value ? 100 : 0,
        }}
        onClick={handleClick}
        onMouseenter={() => (isHovered.value = true)}
        onMouseleave={() => (isHovered.value = false)}
        // v-ripple={{ class: "c-text-gray" }}
      >
        <div class="c-w-full c-h-14 c-flex c-justify-center c-items-center">
          <ElementListItemIcon
            width="32px"
            height="32px"
            highlight={false}
            element={props.element}
            isHovered={isHovered.value}
          />
        </div>
        <span class="c-text-sm">{props.element.label}</span>
      </div>
    );
  },
});

export const ElementListItemIcon = defineComponent({
  props: {
    element: {
      type: Object,
      required: true,
    },
    isHovered: {
      type: Boolean,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "16px",
    },
    height: {
      type: String,
      default: "16px",
    },
  },
  setup(props) {
    const getElementSvg = (tag: string) => {
      return elementController!.elementConfigMap[tag].icon;
    };
    return () => {
      const StringIcon = () => {
        return (
          <SvgIcon
            name={props.element.icon}
            class={[
              {
                "c-fill-blue-500 dark:c-fill-blue-500":
                  props.isHovered && props.highlight,
              },
              { "dark:c-fill-white": !props.isHovered && props.highlight },
            ]}
            style={{
              width: props.width,
              height: props.height,
            }}
          />
        );
      };

      const ComponentIcon = () => {
        const Icon = getElementSvg(props.element.key);
        return (
          <Icon
            style={{
              width: props.width,
              height: props.height,
            }}
            class={[
              {
                "c-fill-blue-500 dark:c-fill-blue-500":
                  props.isHovered && props.highlight,
              },
              { "dark:c-fill-white": !props.isHovered || !props.highlight },
            ]}
          />
        );
      };
      return (
        <>
          {typeof props.element.icon === "string"
            ? StringIcon()
            : ComponentIcon()}
        </>
      );
    };
  },
});
