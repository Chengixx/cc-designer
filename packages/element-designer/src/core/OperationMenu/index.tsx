import { defineComponent, inject, PropType } from "vue";
import { OperationButtonSetting } from "./operationButtonSetting";
import ModeButtonGroup from "./ModeButtonGroup";
import LeftOperationArea from "./LeftOperationArea";
import RightOperationArea from "./RightOperationArea";
import { QueueManage } from "@cgx-designer/hooks";

const OperationMenu = defineComponent({
  props: {
    buttonMap: {
      type: Object as PropType<Record<string, OperationButtonSetting>>,
      required: true,
    },
  },
  setup(props) {
    const queueManager = inject("queueManager") as QueueManage;

    return () => (
      <div class="c-h-[40px] c-flex c-items-center c-border-y c-bg-white c-border-gray-200 dark:c-bg-darkMode dark:c-border-darkMode">
        {/* 模式切换区域 */}
        <div class="c-h-full c-flex c-justify-center c-items-center c-py-2">
          <div class="c-h-full c-border-r c-px-4 c-flex c-justify-center c-items-center dark:c-border-[#3e434c]">
            <ModeButtonGroup />
          </div>
        </div>

        {/* 左侧操作区域 */}
        <LeftOperationArea
          buttonMap={props.buttonMap}
          undoDisabled={!queueManager.canUndo()}
          redoDisabled={!queueManager.canRedo()}
        />

        {/* 右侧操作区域 */}
        <RightOperationArea buttonMap={props.buttonMap} />
      </div>
    );
  },
});

export default OperationMenu;
