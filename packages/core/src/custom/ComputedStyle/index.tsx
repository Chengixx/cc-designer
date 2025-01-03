import { ElDivider } from "element-plus";
import { defineComponent, PropType, ref, watch } from "vue";
import ComputedStyleInput from "./components/ComputedStyleInput";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";

const ComputedStyleWidget = defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Record<string, string>>,
      require: true,
      default: () => {},
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const styleState = ref<Record<string, string>>(props.modelValue ?? {});
    //!这里是一定要加这个的 因为外部变化了 这里也要变化 否则这里的本地state会直接覆盖
    watch(
      () => props.modelValue,
      () => {
        styleState.value = props.modelValue;
      },
      { deep: true, immediate: true }
    );

    watch(
      () => styleState.value,
      (nv) => {
        emit("update:modelValue", nv);
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
            <span class="c-absolute c-top-[2px] c-left-[4px] c-text-xs c-text-gray-800 c-font-medium">
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
                direction === "Top" && "c-left-1/2 c-top-1 -c-translate-x-1/2",
                direction === "Left" && "c-left-[2px] c-top-1/2 -c-translate-y-1/2",
                direction === "Bottom" && "c-left-1/2 c-bottom-3 -c-translate-x-1/2",
                direction === "Right" && "c-right-[2px] c-top-1/2 -c-translate-y-1/2",
              ]}
            />
          </>
        );
      });
    };

    return () => (
      <div class="c-w-full c-h-fit">
        <ElDivider content-position="center">计算样式</ElDivider>
        <div class="c-w-full c-h-[180px] c-m-auto">
          {/* margin的在最外面 */}
          <div class="c-w-full c-h-[180px] c-bg-[#f2cea5] c-px-14 c-py-10 c-box-border c-relative dark:bg-[#b08354]">
            {InputRenderHelper("margin")}
            {/* padding的在里面 */}
            <div class="c-w-full c-h-[100px] c-bg-[#c6cf92] c-px-14 c-py-10 c-box-border c-relative dark:bg-[#b8c480]">
              {InputRenderHelper("padding")}
              <div class="c-bg-[#88b2bd] c-w-full c-h-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default ComputedStyleWidget;
