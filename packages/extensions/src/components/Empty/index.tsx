import { EmptyIcon } from "@cgx-designer/icons";
import { defineComponent } from "vue";

const Empty = defineComponent({
  setup() {
    return () => (
      <div class="c-pointer-events-none c-text-gray-400 dark:c-text-gray-400 c-text-sm c-text-center c-py-10 c-flex c-flex-col c-justify-center c-items-center">
        <EmptyIcon class="c-fill-gray-400 dark:c-fill-gray-700 c-h-28 c-w-28" />
        <span>暂无数据</span>
      </div>
    );
  },
});

export default Empty;
