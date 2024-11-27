import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import { IEditorElement } from "../../../../cgx-designer/dist/core";
import { ElInput, ElOption, ElSelect } from "element-plus";
import { OptionGroup } from "element-plus/es/components/select-v2/src/select.types.mjs";

const StyleInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const options: OptionGroup[] = [
      { label: "px", value: "px" },
      { label: "em", value: "em" },
      { label: "rem", value: "rem" },
      { label: "vw", value: "vw" },
      { label: "vh", value: "vh" },
      { label: "%", value: "%" },
    ];
    const bindValue = ref<string | null>(null);
    const stylePrefix = ref<string>("px");
    watch(
      () => bindValue.value + stylePrefix.value,
      () => {
        emit(
          "update:modelValue",
          bindValue.value ? bindValue.value + stylePrefix.value : undefined
        );
      }
    );
    return () => (
      <ElInput v-model={bindValue.value}>
        {{
          append: () => {
            return (
              <ElSelect v-model={stylePrefix.value} style="width: 75px">
                {options.map((option) => {
                  return (
                    <ElOption
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  );
                })}
              </ElSelect>
            );
          },
        }}
      </ElInput>
    );
  },
});

export default StyleInput;
