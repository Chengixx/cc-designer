import { defineComponent, inject, ref } from "vue";
import { ToLeftIcon, ToRightIcon } from "@cgx-designer/icons";
import { FocusManage } from "@cgx-designer/hooks";

const CollapseButton = defineComponent({
  props: {
    isLeft: {
      type: Boolean,
      required: true,
    },
    collapseState: {
      type: Boolean,
      required: true,
    },
    toggleMenu: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const widgetHover = ref<boolean>(false);
    const focusManager = inject("focusManager") as FocusManage;

    const onClick = () => {
      focusManager.startFocusTimedQuery();
      props.toggleMenu();
      setTimeout(() => {
        focusManager.stopFocusTimedQuery();
      }, 350);
    };

    return () => {
      const IconComponent = props.isLeft
        ? props.collapseState
          ? ToLeftIcon
          : ToRightIcon
        : props.collapseState
          ? ToRightIcon
          : ToLeftIcon;
      const hoverClass = widgetHover.value
        ? "c-fill-blue-500"
        : "dark:c-fill-white";
      const sideClass = props.isLeft
        ? props.collapseState
          ? "c-left-[348px]"
          : "c-left-[48px]"
        : props.collapseState
          ? "c-right-[300px]"
          : "c-right-0";
      const sideRoundedClass = props.isLeft
        ? "c-rounded-r-lg"
        : "c-rounded-l-lg";
      return (
        <div
          class={[
            "c-absolute c-transition-all c-duration-300 c-z-20 c-cursor-pointer c-top-[calc(50%-40px)] c-translate-y--1/2 c-w-3 c-h-16 c-bg-white hover:c-bg-[#f5f8fd] c-flex c-justify-center c-items-center dark:c-bg-[#141414] dark:hover:c-bg-[#282b31]",
            sideClass,
            sideRoundedClass,
          ]}
          onMouseenter={() => {
            widgetHover.value = true;
          }}
          onMouseleave={() => {
            widgetHover.value = false;
          }}
          onClick={onClick}
        >
          <IconComponent class={hoverClass} />
        </div>
      );
    };
  },
});

export default CollapseButton;
