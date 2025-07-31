import { ref, watch, computed } from "vue";
import { ElementManage } from "./useElement";
import { IElementSchema } from "@cgx-designer/types";
import { ModeManage } from "./useMode";
import { getElementDomInstance } from "./useElementDom";

export type HoverManage = ReturnType<typeof useHover>;

export const useHover = (
  elementManager: ElementManage,
  modeManager: ModeManage
) => {
  //当前手机还是电脑还是平板模式
  const currentMode = computed(() => modeManager.mode.value);
  //总的容器
  const containerRef = ref<HTMLDivElement | null>(null);
  //初始化要展示的hover总容器
  const hoverWidgetRef = ref<HTMLDivElement | null>(null);
  //是否可以进行hover，因为拖拽的时候不要显示
  const disableHover = ref<boolean>(false);
  //当前选中的hover
  const hoveredElement = ref<IElementSchema | null>(null);
  //是否显示hoverBox
  const showHoverBox = ref<boolean>(false);

  //当前hover到的元素实例 - 使用共享逻辑
  const hoveredElementDom = computed(() =>
    getElementDomInstance(elementManager, hoveredElement.value)
  );

  const initCanvas = (ref: HTMLDivElement) => {
    containerRef.value = ref;
  };

  const setDisableHoverStatus = (status: boolean = true) => {
    disableHover.value = status;
  };

  //初始化这个hover的物件ref
  const setHoverWidgetRef = (el: HTMLDivElement) => {
    hoverWidgetRef.value = el;
  };

  const setHoveredElement = (elementSchema: IElementSchema | null = null) => {
    hoveredElement.value = elementSchema;
  };

  const setShowHoverBox = (status: boolean = false) => {
    showHoverBox.value = status;
  };

  const handleHover = (e: MouseEvent, hoverInstanceSchema: IElementSchema) => {
    if (disableHover.value) return;
    //元素会有重叠 所以这里需要防止冒泡
    e.stopPropagation();
    hoveredElement.value = hoverInstanceSchema;
    setHoverWidgetStyle();
  };

  //修改这个hover物件的样式
  const setHoverWidgetStyle = () => {
    if (
      !hoveredElementDom.value ||
      !containerRef.value ||
      !hoverWidgetRef.value
    ) {
      return;
    }

    // 获取容器和元素的边界信息
    const containerRect = containerRef.value.getBoundingClientRect();
    const elementRect = hoveredElementDom.value.getBoundingClientRect();

    if (!elementRect) return;

    // 计算模式偏移量
    const modeOffset =
      currentMode.value !== "pc" ? { left: 10, top: 10 } : { left: 0, top: 0 };

    // 计算元素相对于容器的位置
    const relativeLeft =
      elementRect.left - containerRect.left - modeOffset.left;
    const relativeTop =
      elementRect.top -
      containerRect.top +
      (containerRef.value.scrollTop || 0) -
      modeOffset.top;

    // 设置悬停框的样式
    const hoverWidget = hoverWidgetRef.value;
    hoverWidget.style.left = `${relativeLeft}px`;
    hoverWidget.style.top = `${relativeTop}px`;
    hoverWidget.style.width = `${elementRect.width}px`;
    hoverWidget.style.height = `${elementRect.height}px`;
  };

  const handleCancelHover = (e: MouseEvent) => {
    e.stopPropagation();
    hoveredElement.value = null;
  };

  let hideTimer: NodeJS.Timeout | number = 0;
  watch(hoveredElement, (nv) => {
    if (nv) {
      showHoverBox.value = true;
      clearTimeout(hideTimer);
    } else {
      //给一个缓冲的时间
      hideTimer = setTimeout(() => {
        showHoverBox.value = false;
      }, 300);
    }
  });

  return {
    setHoveredElement,
    setHoverWidgetRef,
    setDisableHoverStatus,
    setShowHoverBox,
    hoveredElement,
    hoverWidgetRef,
    showHoverBox,
    handleHover,
    handleCancelHover,
    initCanvas,
  };
};
