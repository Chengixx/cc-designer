import { CollapseManage, FocusManage } from "@cgx-designer/hooks";
import { ToLeftIcon, ToRightIcon } from "@cgx-designer/icons";
import { defineComponent, inject, ref } from "vue";

const CollapseWidget = defineComponent({
  setup() {
    const collapseManage = inject("collapseManage") as CollapseManage;
    const focusManage = inject("focusManage") as FocusManage;
    const leftWidgetHover = ref<boolean>(false);
    const rightWidgetHover = ref<boolean>(false);
    return () => (
      <>
        {/* 左侧小按钮 */}
        <div
          class={[
            "absolute transition-all duration-300 z-20 cursor-pointer top-[calc(50%-40px)] translate-y--1/2 w-3 h-16 bg-white hover:bg-[#f5f8fd] rounded-r-lg flex justify-center items-center dark:bg-[#141414] dark:hover:hover:bg-[#282b31]",
            collapseManage.leftMenuCollapseState.value
              ? "left-[260px]"
              : "left-0",
          ]}
          onMouseenter={() => {
            leftWidgetHover.value = true;
          }}
          onMouseleave={() => {
            leftWidgetHover.value = false;
          }}
          onClick={() => {
            focusManage.startFocusTimedQuery();
            collapseManage.toggleLeftMenu();
            setTimeout(() => {
              focusManage.stopFocusTimedQuery();
            }, 350);
          }}
        >
          {collapseManage.leftMenuCollapseState.value ? (
            <ToLeftIcon
              class={
                leftWidgetHover.value ? "fill-blue-500" : "dark:fill-white"
              }
            />
          ) : (
            <ToRightIcon
              class={
                leftWidgetHover.value ? "fill-blue-500" : "dark:fill-white"
              }
            />
          )}
        </div>
        {/* 右侧小按钮 */}
        <div
          class={[
            "absolute transition-all duration-300 z-20 cursor-pointer top-[calc(50%-40px)] translate-y--1/2 w-3 h-16 bg-white hover:bg-[#f5f8fd] rounded-l-lg flex justify-center items-center dark:bg-[#141414] dark:hover:hover:bg-[#282b31]",
            collapseManage.rightMenuCollapseState.value
              ? "right-[280px]"
              : "right-0",
          ]}
          onMouseenter={() => {
            rightWidgetHover.value = true;
          }}
          onMouseleave={() => {
            rightWidgetHover.value = false;
          }}
          onClick={() => {
            focusManage.startFocusTimedQuery();
            collapseManage.toggleRightMenu();
            setTimeout(() => {
              focusManage.stopFocusTimedQuery();
            }, 350);
          }}
        >
          {collapseManage.rightMenuCollapseState.value ? (
            <ToRightIcon
              class={
                leftWidgetHover.value ? "fill-blue-500" : "dark:fill-white"
              }
            />
          ) : (
            <ToLeftIcon
              class={
                leftWidgetHover.value ? "fill-blue-500" : "dark:fill-white"
              }
            />
          )}
        </div>
      </>
    );
  },
});

export default CollapseWidget;
