import {
  computed,
  defineComponent,
  inject,
  nextTick,
  Ref,
  ref,
  watch,
} from "vue";
import {
  ElementManage,
  FocusManage,
  HoverManage,
  QueueManage,
  useToggle,
} from "@cgx-designer/hooks";
import { deepClone } from "@cgx-designer/utils";
import { ClearIcon, CopyIcon, TopIcon } from "@cgx-designer/icons";
import { noCopyDomList, findHigherLevelDomList } from "../../../constant/index";
import { elementController } from "@cgx-designer/controller";
import { IElementSchema } from "@cgx-designer/types";

const BottonToolIconSell = (props: {
  Icon: any;
  title: string;
  clickCb: (e: MouseEvent) => void;
  show?: boolean;
}) => {
  const { Icon, title, clickCb, show = true } = props;
  if (!show) return null;
  return (
    <div
      onClick={(e: MouseEvent) => clickCb(e)}
      title={title}
      class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-w-fit c-p-1 c-flex c-justify-center c-items-center"
    >
      <Icon class="c-w-[13px] c-h-[13px] c-fill-white" />
    </div>
  );
};

const ButtonTool = defineComponent({
  setup() {
    const focusManager = inject("focusManager") as FocusManage;
    const hoverManager = inject("hoverManager") as HoverManage;
    const elementManager = inject("elementManager") as ElementManage;
    const queueManager = inject("queueManager") as QueueManage;
    const editorCanvasRef = inject("editorCanvasRef") as Ref<HTMLDivElement>;
    const position = ref<"top" | "bottom">("top");
    const TOOL_HEIGHT = 28;
    const [isHover, setIsHover] = useToggle(false);

    // 更新操作条位置
    const updateToolPosition = () => {
      const el = focusManager.focusedElementDom.value;
      if (!el) return;

      nextTick(() => {
        const rect = el.getBoundingClientRect();
        position.value = rect.top < 120 ? "bottom" : "top";
      });
    };

    watch(() => focusManager.focusedElementDom.value, updateToolPosition, {
      immediate: true,
    });

    watch(() => focusManager.focusWidgetRect.value, updateToolPosition);

    const toolStyle = computed(() =>
      position.value === "top"
        ? { top: `-${TOOL_HEIGHT}px`, bottom: undefined }
        : {
            top: undefined,
            bottom: `-${TOOL_HEIGHT * elementTree.value.length}px`,
          }
    );

    const horizontalPosition = computed(() => {
      const rect = focusManager.focusWidgetRect.value;
      const container = editorCanvasRef?.value;
      if (!rect || !container) return "c-right-1";

      const TOOL_CONFIG = {
        width: 200,
        spacing: 4,
      } as const;

      const containerWidth = container.offsetWidth;

      // 计算两种对齐方式的位置
      const positions = {
        right: rect.left + rect.width - TOOL_CONFIG.width - TOOL_CONFIG.spacing,
        left: rect.left + TOOL_CONFIG.width + TOOL_CONFIG.spacing,
      };

      // 检查溢出情况
      const overflows = {
        right: positions.right < 0,
        left: positions.left > containerWidth,
      };

      // 智能选择对齐方式
      return overflows.right
        ? "c-left-1"
        : overflows.left
          ? "c-right-1"
          : "c-right-1";
    });

    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      const newElementSchema = elementManager.deepCopyElement(
        deepClone(focusManager.focusedElement.value!)
      );
      elementManager.addElementFromLast(newElementSchema as IElementSchema);
      focusManager.handleFocus(newElementSchema as IElementSchema);
      queueManager.push("copy");
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      focusManager.startFocusTimedQuery();
      const id = focusManager.focusedElement.value?.id;
      elementManager.deleteElementById(id!);
      focusManager.resetFocus();
      queueManager.push("delete");
      focusManager.stopFocusTimedQuery();
    };

    const handleTop = (e: MouseEvent) => {
      e.stopPropagation();
      const id = focusManager.focusedElement.value?.id;
      const parentDom = elementManager.getParentElementById(id!);
      focusManager.handleFocus(parentDom!);
    };

    const elementTree = computed(() => {
      const innerTree = elementManager.getElementTreePathById(
        focusManager.focusedElement.value?.id!
      );
      return isHover.value ? innerTree : innerTree.slice(-1);
    });

    return () => (
      <div
        class={`c-absolute c-cursor-pointer c-flex ${horizontalPosition.value}`}
        style={toolStyle.value}
      >
        {/* 组件信息 */}
        <div
          class="c-mr-1 c-flex c-flex-col c-gap-y-1 c-items-center c-pointer-events-auto c-whitespace-nowrap"
          onMouseenter={() => setIsHover(true)}
          onMouseleave={() => setIsHover(false)}
        >
          {elementTree.value.length &&
            elementTree.value.reverse().map((elementSchema) => {
              const elmentConfig = elementController.getElementConfig(
                elementSchema.key
              );
              const ElementIcon = elmentConfig.icon;
              const elementTag = elmentConfig.label;
              return (
                <div
                  class="c-w-full c-flex c-gap-x-1 c-p-1 c-bg-blue-500 c-rounded c-text-xs c-text-white"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    focusManager.handleFocus(elementSchema);
                    setIsHover(false);
                  }}
                  onMouseenter={(e: MouseEvent) => {
                    hoverManager.handleHover(e, elementSchema);
                  }}
                  onMouseleave={(e: MouseEvent) => {
                    e.stopPropagation();
                    hoverManager.setHoveredElement();
                  }}
                >
                  <ElementIcon class="c-w-[16px] c-h-[16px] c-fill-white" />
                  {elementTag}
                </div>
              );
            })}
        </div>
        {/* 操作按钮 */}
        <div class="c-pointer-events-auto c-bg-blue-500 c-flex c-items-center c-overflow-hidden c-h-6">
          <BottonToolIconSell
            Icon={CopyIcon}
            title="复制组件"
            clickCb={handleCopy}
            show={
              !noCopyDomList.includes(focusManager.focusedElement.value?.key!)
            }
          />
          <BottonToolIconSell
            Icon={TopIcon}
            title="父级元素"
            clickCb={handleTop}
            show={findHigherLevelDomList.includes(
              focusManager.focusedElement.value?.key!
            )}
          />
          <BottonToolIconSell
            Icon={ClearIcon}
            title="删除组件"
            clickCb={handleDelete}
            show={true}
          />
        </div>
      </div>
    );
  },
});
export default ButtonTool;
