import { CollapseManage } from "@cgx-designer/hooks";
import { defineComponent, inject } from "vue";
import CollapseButton from "./CollapseButton";

const CollapseWidget = defineComponent({
  setup() {
    const collapseManager = inject("collapseManager") as CollapseManage;
    return () => (
      <>
        {/* 左侧小按钮 */}
        {/* <CollapseButton
          isLeft={true}
          collapseState={collapseManager.leftMenuCollapseState.value}
          toggleMenu={collapseManager.toggleLeftMenu}
        /> */}
        {/* 右侧小按钮 */}
        <CollapseButton
          isLeft={false}
          collapseState={collapseManager.rightMenuCollapseState.value}
          toggleMenu={collapseManager.toggleRightMenu}
        />
      </>
    );
  },
});

export default CollapseWidget;
