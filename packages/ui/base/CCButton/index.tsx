//!优雅的一笔 ~~ >.<
//Todo 不知道为什么这里需要具体指定路径
import { computed, defineComponent, PropType } from "vue";
import { vWaves } from "@cgx-designer/utils/directives/waves/index";

const CCButton = defineComponent({
  directives: {
    wave: vWaves,
  },
  props: {
    type: {
      type: String as PropType<"1" | "2" | "3" | "4">,
      default: "1",
    },
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      emit("click", e);
    };

    const buttonClass = computed(() => {
      const btnClass: Record<string, string> = {
        "1": "before:top-0 before:rounded-b-50% hover:before:h-180% text-blue-500 hover:text-white",
        "2": "before:bottom-0 before:rounded-t-50% hover:before:h-180% text-blue-500 hover:text-white",
        "3": "before:top-0 before:rounded-b-50% before:h-180% hover:before:h-0 text-white hover:text-blue-500",
        "4": "before:bottom-0 before:rounded-t-50% before:h-180% hover:before:h-0 text-white hover:text-blue-500",
      };
      return btnClass[props.type];
    });

    return () => {
      return (
        <div>
          <button
            v-wave
            class={[
              // 基础按钮样式
              "rounded-lg border z-0 border-solid border-blue-500 py-2 px-5 text-base cursor-pointer duration-700 relative overflow-hidden",
              //这个是基础before的
              "before:duration-700 before:-z-10 before:absolute before:left-0 before:w-full before:h-0 before:bg-blue-500 ",
              //这个根据不同的 去弄不同的
              buttonClass.value,
            ]}
            onClick={(e) => handleClick(e)}
          >
            {/* 默认插槽 */}
            {slots.default?.()}
          </button>
        </div>
      );
    };
  },
});
export default CCButton;
