import { IEditorElement } from "@cgx-designer/core";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  PropType,
  ref,
  Ref,
  Slots,
} from "vue";
import TreeNodes from "./TreeNodes.vue";
import { elementController } from "@cgx-designer/controller";
import { RightIcon } from "@cgx-designer/icons";
import Transition from "../Transition/index.vue";

const TreeNode = defineComponent({
  name: "TreeNode",
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      required: true,
    },
  },
  setup(props) {
    const $child = ref<HTMLElement>();
    //从父组件拿到插槽
    const slots = inject("slots", {}) as Slots;
    const expandedKeys = inject("expandedKeys") as Ref<string[]>;
    const selectedKey = inject("selectedKey") as Ref<string>;
    const handleSelect = inject("handleSelect") as (
      id: string,
      elementSchema: IEditorElement
    ) => void;
    const registerExpandedKeys = inject("registerExpandedKeys") as (
      id: string
    ) => void;

    const isExpanded = computed(() => {
      return expandedKeys.value.includes(props.elementSchema.id ?? "");
    });

    const handleExpanded = () => {
      //点击的时候再加上动画
      $child.value!.style.transition = "all 0.3s";
      const id = props.elementSchema.id;
      if (!id) {
        return false;
      }

      if (expandedKeys.value.includes(id)) {
        expandedKeys.value = expandedKeys.value.filter((item) => item !== id);
      } else {
        expandedKeys.value.push(id);
      }
    };

    const handleRegister = () => {
      const id = props.elementSchema.id;
      if (!id || !props.elementSchema.elementList?.length) {
        return false;
      }
      registerExpandedKeys(id);
    };

    onMounted(handleRegister);

    return () => {
      const ElementIcon = elementController.getElementConfig(
        props.elementSchema.key
      ).icon;

      const ExpandIcon = (
        <>
          {props.elementSchema.elementList?.length ? (
            <div
              class="c-flex c-items-center c-absolute c-left-0 c-top-[5px]"
              onClick={handleExpanded}
            >
              <RightIcon
                class={[
                  "c-w-5 c-h-5 c-transition-all c-fill-gray-500",
                  isExpanded.value ? "c-rotate-90" : "",
                ]}
              />
            </div>
          ) : undefined}
        </>
      );

      const TreeContent = (
        <div
          class={[
            // 已经选中的样式
            "c-h-8 c-w-full c-py-[2px] c-flex c-justify-between",
            selectedKey.value === props.elementSchema.id! &&
              "c-bg-blue-50 dark:c-bg-[#272d36]",
          ]}
          onClick={() => {
            handleSelect(props.elementSchema.id!, props.elementSchema);
          }}
        >
          {slots["tree-node"]?.(props) ?? (
            <div class="c-px-2 c-flex c-items-center">
              <ElementIcon class="c-h-4 c-w-4 dark:c-fill-white" />
              <span class="c-truncate c-text-sm c-ml-1">
                {props.elementSchema.label ??
                  elementController.getElementConfig(props.elementSchema.key)
                    .label}
              </span>
              <span class="c-truncate c-ml-2 c-text-xs c-text-gray-400">
                {props.elementSchema.id}
              </span>
            </div>
          )}
          {slots["extension"]?.(props) ?? undefined}
        </div>
      );

      const TreeNodeChild = (
        <Transition>
          {props.elementSchema.elementList?.length ? (
            <div ref={$child} v-show={isExpanded.value}>
              <TreeNodes
                elementList={props.elementSchema.elementList}
                onUpdate:elementList={(e) => {
                  props.elementSchema.elementList = e;
                }}
              />
            </div>
          ) : undefined}
        </Transition>
      );

      return (
        <div
          class={[
            "c-pl-4 c-cursor-pointer c-relative c-w-full leading-8",
            props.elementSchema.elementList?.length && "isExpanded",
          ]}
        >
          {[ExpandIcon, TreeContent, TreeNodeChild]}
        </div>
      );
    };
  },
});

export default TreeNode;
