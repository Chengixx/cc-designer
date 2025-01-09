import { defineComponent, inject, ref } from "vue";
import { vWaves } from "@cgx-designer/extensions";
import { FocusManage, ModeManage, ModeType } from "@cgx-designer/hooks";

interface ModeTypes {
  label: string;
  value: ModeType;
}

const ModeButtonGroup = defineComponent({
  directives: {
    wave: vWaves,
  },
  setup() {
    const modeManage = inject("modeManage") as ModeManage;
    const focusManage = inject("focusManage") as FocusManage;
    const { setMode } = modeManage;
    const modeTypes: ModeTypes[] = [
      { label: "Pc", value: "pc" },
      { label: "Pad", value: "ipad" },
      { label: "Pe", value: "pe" },
    ];

    return () => (
      <div class="c-w-32 c-h-full c-flex c-border c-rounded-md c-cursor-pointer c-box-border dark:c-p-[1px]">
        {modeTypes.map((modeItem) => {
          return (
            <div
              class={[
                "c-flex-1 flex c-justify-center c-items-center c-text-center",
                modeManage.mode.value === modeItem.value &&
                  "c-bg-gray-200 dark:c-bg-gray-700",
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
              <div class="c-w-full c-h-full" v-wave>
                <span
                  class={[
                    "c-text-sm c-select-none",
                    modeManage.mode.value === modeItem.value &&
                      "c-text-blue-500",
                  ]}
                >
                  {modeItem.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});

export default ModeButtonGroup;
