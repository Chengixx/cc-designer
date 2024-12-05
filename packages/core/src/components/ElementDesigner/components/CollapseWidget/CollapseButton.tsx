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
    const focusManage = inject("focusManage") as FocusManage;

    const onClick = () => {
      focusManage.startFocusTimedQuery();
      props.toggleMenu();
      setTimeout(() => {
        focusManage.stopFocusTimedQuery();
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
        ? "fill-blue-500"
        : "dark:fill-white";
      const sideClass = props.isLeft
        ? props.collapseState
          ? "left-[280px]"
          : "left-0"
        : props.collapseState
          ? "right-[280px]"
          : "right-0";
      const sideRoundedClass = props.isLeft ? "rounded-r-lg" : "rounded-l-lg";
      return (
        <div
          class={[
            "absolute transition-all duration-300 z-20 cursor-pointer top-[calc(50%-40px)] translate-y--1/2 w-3 h-16 bg-white hover:bg-[#f5f8fd] flex justify-center items-center dark:bg-[#141414] dark:hover:bg-[#282b31]",
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
