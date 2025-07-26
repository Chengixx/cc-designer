import { elementController } from "@cgx-designer/controller";
import { SearchIcon } from "@cgx-designer/icons";
import { computed, defineComponent } from "vue";

const SearchBox = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入查询条件",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const Input = elementController.getElementRender("input");
    const bindValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });
    return () => (
      <div class="c-w-full c-px-1 c-py-2 dark:c-border-darkMode">
        <Input
          placeholder={props.placeholder}
          v-model={bindValue.value}
          clearable
          density="compact"
          variant="outlined"
          hide-details
          single-line
        >
          {{
            prefix: () => {
              return (
                <SearchIcon class="c-select-none c-w-[17px] c-h-[17px] dark:c-fill-white" />
              );
            },
          }}
        </Input>
      </div>
    );
  },
});
export default SearchBox;
