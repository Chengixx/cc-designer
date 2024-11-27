import { ElDivider } from "element-plus";
import { defineComponent, PropType, ref, watch } from "vue";
import ComputedStyleInput from "./ComputedStyleInput";
import { deepClone, getValueByPath, setValueByPath } from "@cgx-designer/utils";

const ComputedStyleWidget = defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Record<string, string>>,
      require: true,
      default: () => {},
    },
  },
  emits: ["updateModelValue"],
  setup(props, { emit }) {
    const styleState = ref<Record<string, string>>(props.modelValue ?? {});

    watch(
      () => styleState.value,
      (nv) => {
        emit("updateModelValue", nv);
      },
      { deep: true }
    );

    const directions: string[] = ["Top", "Left", "Bottom", "Right"];
    //帮助渲染input
    const InputRenderHelper = (prefix: "margin" | "padding") => {
      return directions.map((direction) => {
        const key = `${prefix}${direction}`;
        const labelMap = {
          margin: "外边距",
          padding: "内边距",
        };
        return (
          <>
            <span class="absolute top-[2px] left-[4px] text-xs">
              {labelMap[prefix]}
            </span>
            <ComputedStyleInput
              key={key}
              modelValue={getValueByPath(styleState.value, key)}
              onUpdate:modelValue={(v) =>
                setValueByPath(styleState.value, key, v)
              }
              class={[
                "absolute transform",
                direction === "Top" && "left-1/2 top-1 -translate-x-1/2",
                direction === "Left" && "left-[2px] top-1/2 -translate-y-1/2",
                direction === "Bottom" && "left-1/2 bottom-3 -translate-x-1/2",
                direction === "Right" && "right-[2px] top-1/2 -translate-y-1/2",
              ]}
            />
          </>
        );
      });
    };

    return () => (
      <div class="w-full h-fit">
        <ElDivider content-position="center">计算样式</ElDivider>
        <div class="w-full h-[180px] m-auto">
          {/* margin的在最外面 */}
          <div class="w-full h-[180px] bg-[#f2cea5] px-14 py-10 box-border relative dark:bg-[#b08354]">
            {InputRenderHelper("margin")}
            {/* padding的在里面 */}
            <div class="w-full h-[100px] bg-[#c6cf92] px-14 py-10 box-border relative dark:bg-[#b8c480]">
              {InputRenderHelper("padding")}
              <div class="bg-[#88b2bd] w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default ComputedStyleWidget;
