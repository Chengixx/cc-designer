import { CollapseManage } from "@cgx-designer/hooks";
import { defineComponent, inject } from "vue";
import CollapseButton from "./CollapseButton";

const CollapseWidget = defineComponent({
  setup() {
    const collapseManage = inject("collapseManage") as CollapseManage;
    return () => (
      <>
        {/* 左侧小按钮 */}
        <CollapseButton
          isLeft={true}
          collapseState={collapseManage.leftMenuCollapseState.value}
          toggleMenu={collapseManage.toggleLeftMenu}
        />
        {/* 右侧小按钮 */}
        <CollapseButton
          isLeft={false}
          collapseState={collapseManage.rightMenuCollapseState.value}
          toggleMenu={collapseManage.toggleRightMenu}
        />
      </>
    );
  },
});

export default CollapseWidget;
