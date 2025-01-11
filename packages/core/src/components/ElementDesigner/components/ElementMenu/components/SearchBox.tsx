import { elementController } from "@cgx-designer/controller";
import { SearchIcon } from "@cgx-designer/icons";
import { computed, defineComponent } from "vue";

const SearchBox = defineComponent({
  props: {
    widgetName: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const Input = elementController.getElementRender("input");
    const inputWidgetName = computed({
      get() {
        return props.widgetName;
      },
      set(value) {
        emit("update:widgetName", value);
      },
    });
    return () => {
      return (
        <div class="c-w-full c-border c-box-border c-p-1 dark:c-border-darkMode">
          <Input
            placeholder="搜索组件"
            v-model={inputWidgetName.value}
            clearable
            density="compact"
            variant="outlined"
            hide-details
            single-line
          >
            {{
              prefix: () => {
                return (
                  <SearchIcon class="c-w-[17px] c-h-[17px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
                );
              },
            }}
          </Input>
        </div>
      );
    };
  },
});
export default SearchBox;
