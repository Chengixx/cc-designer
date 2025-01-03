import { Search } from "@element-plus/icons-vue";
import { ElIcon, ElInput } from "element-plus";
import { computed, defineComponent } from "vue";

const SearchBox = defineComponent({
  props: {
    widgetName: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
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
          <ElInput
            placeholder="搜索组件"
            v-model={inputWidgetName.value}
            clearable
          >
            {{
              prefix: () => {
                return (
                  <ElIcon>
                    <Search />
                  </ElIcon>
                );
              },
            }}
          </ElInput>
        </div>
      );
    };
  },
});
export default SearchBox;
