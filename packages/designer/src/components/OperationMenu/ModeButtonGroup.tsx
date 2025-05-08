import { defineComponent, inject } from "vue";
import { Ripple } from "@cgx-designer/extensions";
import {
  FocusManage,
  ModeIconMap,
  ModeManage,
  ModeType,
} from "@cgx-designer/hooks";

interface ModeTypes {
  label: string;
  value: ModeType;
}

const ModeButtonGroup = defineComponent({
  directives: { ripple: Ripple },
  setup() {
    const modeManage = inject("modeManage") as ModeManage;
    const focusManage = inject("focusManage") as FocusManage;
    const { setMode } = modeManage;
    const modeTypes: ModeTypes[] = [
      { label: "Pc", value: "pc" },
      { label: "Pad", value: "ipad" },
      { label: "Pe", value: "pe" },
    ];

    return () => {
      return (
        <div class="c-w-24 c-h-full c-flex c-border c-rounded-md c-overflow-hidden c-cursor-pointer c-box-border dark:c-border-darkMode">
          {modeTypes.map((modeItem, index) => {
            const ModeIconRender = ModeIconMap[modeItem.value];
            return (
              <div
                class={[
                  "c-flex-1 flex c-justify-center c-items-center c-text-center",
                  modeManage.mode.value === modeItem.value &&
                    "c-bg-gray-200 dark:c-bg-gray-700",
                  // 如果不是第一个和最后一个
                  index !== 0 &&
                    index !== modeTypes.length - 1 &&
                    "c-border-x dark:c-border-darkMode",
                ]}
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  focusManage.startFocusTimedQuery();
                  setMode(modeItem.value);
                  setTimeout(() => {
                    focusManage.stopFocusTimedQuery();
                  }, 350);
                }}
              >
                <div
                  class="c-w-full c-h-full c-flex c-justify-center c-items-center"
                  v-ripple
                >
                  <ModeIconRender
                    style={{
                      fill:
                        modeManage.mode.value === modeItem.value
                          ? "#0079f2"
                          : "#666",
                    }}
                    class="c-w-5 c-h-5 dark:c-fill-white"
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    };
  },
});

export default ModeButtonGroup;
