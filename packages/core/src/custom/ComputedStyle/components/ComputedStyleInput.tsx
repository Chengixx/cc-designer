import { defineComponent } from "vue";

const ComputedStyleInput = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formatValue = (value: string): string => {
      const validUnits = ["px", "rem", "%", "vh", "vw", "em"];
      const regex = new RegExp(`^([0-9]*\.?[0-9]+)(${validUnits.join("|")})$`);
      if (regex.test(value)) {
        return value;
      }
      if (value === "auto") {
        return value;
      }
      const number = parseFloat(value);
      if (isNaN(number)) {
        return "";
      }
      return `${number}px`;
    };

    const handleBlur = (e: FocusEvent) => {
      const value = formatValue((e.target as HTMLInputElement).value);
      emit("update:modelValue", value);
    };

    return () => (
      <input
        value={props.modelValue}
        onBlur={(e: FocusEvent) => handleBlur(e)}
        onInput={(e: Event) =>
          emit("update:modelValue", (e.target as HTMLInputElement).value)
        }
        placeholder="      "
        class="c-inline-block c-w-1/3 c-max-w-10 c-h-5 c-border-none c-p-0 c-m-0 c-outline-none c-text-center c-text-sm c-bg-transparent c-underline hover:c-bg-gray-200"
        type="text"
      />
    );
  },
});

export default ComputedStyleInput;
