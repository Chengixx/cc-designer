import { defineComponent } from "vue";

const Empty = defineComponent({
  setup() {
    return () => (
      <div class="c-pointer-events-none c-text-gray-400 c-text-lg c-text-center c-py-20">
        暂无数据
      </div>
    );
  },
});

export default Empty;
