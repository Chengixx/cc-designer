import { computed, defineComponent, inject, PropType, ref, unref } from "vue";
import { CollapseActiveName, CollapseContext } from "./Collapse";
import Transition from "../Transition/index.vue";
import { RightIcon } from "@cgx-designer/icons";

const CollapseItem = defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    name: {
      type: [String, Number] as PropType<CollapseActiveName>,
      default: undefined,
    },
    paddingBottom: {
      type: Boolean,
      default: true,
    },
    boldTitle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const collapse = inject("collapseContext") as CollapseContext;

    const isClick = ref(false);
    const name = computed(() => {
      return props.name;
    });

    const isActive = computed(() =>
      collapse?.activeNames.value.includes(unref(name)!)
    );

    const handleHeaderClick = () => {
      collapse?.handleItemClick(unref(name)!);
      isClick.value = true;
    };

    return () => {
      const ExpandIcon = (
        <RightIcon
          class={[
            "c-w-5 c-h-5 c-transition-all c-fill-gray-500",
            isActive.value ? "-c-rotate-90" : "c-rotate-90",
          ]}
        />
      );

      return (
        <div class="c-w-full">
          {/* 上面的折叠条 */}
          <div
            class={[
              "c-w-full c-h-12 c-flex c-items-center c-justify-between c-px-3 c-text-sm c-box-border c-rounded-sm c-cursor-pointer c-select-none c-border-[#d8d8d8] dark:c-border-darkMode hover:c-bg-[#f6f6f6] dark:hover:c-bg-[#2a2a2a]",
              !isActive.value && "c-border-b",
            ]}
            onClick={handleHeaderClick}
          >
            <span class={props.boldTitle && "c-font-semibold"}>
              {props.title}
            </span>
            {ExpandIcon}
          </div>
          <Transition>
            <div
              class={[
                "c-mt-[-1px] c-w-full c-h-fit c-transition-all c-border-b c-border-[#d8d8d8] dark:c-border-darkMode c-box-border",
                isActive.value && "c-border-t",
                props.paddingBottom && "c-pb-6",
              ]}
              v-show={isActive.value}
            >
              {slots.default?.()}
            </div>
          </Transition>
        </div>
      );
    };
  },
});

export default CollapseItem;
