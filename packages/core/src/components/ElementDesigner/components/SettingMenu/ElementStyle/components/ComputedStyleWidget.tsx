import { ElDivider } from "element-plus";
import { defineComponent, PropType, ref, watch } from "vue";
import StyleInput from "./StyleInput";
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
    // const styleState = ref<Record<string, string>>({
    //   margin: "",
    //   padding: "",
    //   marginLeft: "",
    //   marginRight: "",
    //   marginTop: "",
    //   marginBottom: "",
    //   paddingLeft: "",
    //   paddingRight: "",
    //   paddingTop: "",
    //   paddingBottom: "",
    // });
    const styleState = ref<Record<string, string>>(props.modelValue ?? {});

    watch(
      () => styleState.value,
      (nv) => {
        // console.log("触发了",nv);
        emit("updateModelValue", nv);
      },
      { deep: true }
    );

    return () => (
      <div class="w-full h-fit">
        <button onClick={() => console.log(styleState.value)}>111</button>
        <ElDivider content-position="center">计算样式</ElDivider>
        <div class="w-full h-[180px] m-auto">
          {/* margin的在最外面 */}
          <div class="w-full h-[180px] bg-[#f2cea5] px-14 py-10 box-border relative dark:bg-[#b08354]">
            <span class="absolute top-[2px] left-[4px] text-xs">外边距</span>
            {/* margin-top */}
            <StyleInput
              modelValue={getValueByPath(styleState.value, "marginTop")}
              onUpdate:modelValue={(v) =>
                setValueByPath(styleState.value, "marginTop", v)
              }
              class="absolute left-1/2 top-1 transform -translate-x-1/2"
            />
            {/* margin-left */}
            <StyleInput
              modelValue={getValueByPath(styleState.value, "marginLeft")}
              onUpdate:modelValue={(v) =>
                setValueByPath(styleState.value, "marginLeft", v)
              }
              class="absolute left-[2px] top-1/2 transform -translate-y-1/2"
            />
            {/* margin-bottom */}
            <StyleInput
              modelValue={getValueByPath(styleState.value, "marginBottom")}
              onUpdate:modelValue={(v) =>
                setValueByPath(styleState.value, "marginBottom", v)
              }
              class="absolute left-1/2 bottom-3 transform -translate-x-1/2"
            />
            {/* margin-right */}
            <StyleInput
              modelValue={getValueByPath(styleState.value, "marginRight")}
              onUpdate:modelValue={(v) =>
                setValueByPath(styleState.value, "marginRight", v)
              }
              class="absolute right-[2px] top-1/2 transform -translate-y-1/2"
            />
            {/* padding的在里面 */}
            <div class="w-full h-[100px] bg-[#c6cf92] px-14 py-10 box-border relative dark:bg-[#b8c480]">
              <span class="absolute top-[2px] left-[4px] text-xs">内边距</span>
              {/* padding-top */}
              <StyleInput
                modelValue={getValueByPath(styleState.value, "paddingTop")}
                onUpdate:modelValue={(v) =>
                  setValueByPath(styleState.value, "paddingTop", v)
                }
                class="absolute left-1/2 top-1 transform -translate-x-1/2"
              />
              {/* padding-left */}
              <StyleInput
                modelValue={getValueByPath(styleState.value, "paddingLeft")}
                onUpdate:modelValue={(v) =>
                  setValueByPath(styleState.value, "paddingLeft", v)
                }
                class="absolute left-[2px] top-1/2 transform -translate-y-1/2"
              />
              {/* padding-bottom */}
              <StyleInput
                modelValue={getValueByPath(styleState.value, "paddingBottom")}
                onUpdate:modelValue={(v) =>
                  setValueByPath(styleState.value, "paddingBottom", v)
                }
                class="absolute left-1/2 bottom-3 transform -translate-x-1/2"
              />
              {/* padding-right */}
              <StyleInput
                modelValue={getValueByPath(styleState.value, "paddingRight")}
                onUpdate:modelValue={(v) =>
                  setValueByPath(styleState.value, "paddingRight", v)
                }
                class="absolute right-[2px] top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default ComputedStyleWidget;
