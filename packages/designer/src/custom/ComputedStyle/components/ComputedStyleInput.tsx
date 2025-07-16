import { defineComponent } from "vue";

// 定义有效的CSS单位
const VALID_UNITS = ["px", "rem", "%", "vh", "vw", "em"] as const;

const ComputedStyleInput = defineComponent({
  name: "ComputedStyleInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formatValue = (value: string): string => {
      if (!value.trim()) return "";
      if (value === "auto") return value;
      const unitRegex = new RegExp(
        `^([0-9]*\\.?[0-9]+)(${VALID_UNITS.join("|")})$`
      );
      if (unitRegex.test(value)) return value;
      const number = parseFloat(value);
      if (isNaN(number)) return "";
      return `${number}px`;
    };

    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement;
      const formattedValue = formatValue(target.value);
      emit("update:modelValue", formattedValue);
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return () => (
      <input
        value={props.modelValue}
        onBlur={handleBlur}
        onInput={handleInput}
        placeholder="      "
        class="c-inline-block c-w-1/3 c-max-w-10 c-h-5 c-border-none c-p-0 c-m-0 c-outline-none c-text-center c-text-sm c-bg-transparent c-underline hover:c-bg-gray-200"
        type="text"
      />
    );
  },
});

export default ComputedStyleInput;
