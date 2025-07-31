import { computed, onUnmounted, ref } from "vue";
import { ElementManage } from "./useElement";
import { isEqual } from "lodash-es";
import { useMutationObserver } from "./useMutationObserver";
import { useTimedQuery } from "./useTimedQuery";
import { IElementSchema } from "@cgx-designer/types";
import { ModeManage } from "./useMode";
import { getElementDomInstance } from "./useElementDom";

export type FocusManage = ReturnType<typeof useFocus>;

export type FocusElementRect = Omit<
  DOMRect,
  "bottom" | "right" | "x" | "y" | "toJSON"
>;

export const useFocus = (
  elementManager: ElementManage,
  modeManager: ModeManage
) => {
  //当前选中的元素的rect
  const focusWidgetRect = ref<FocusElementRect | null>(null);
  //当前手机还是电脑还是平板模式
  const currentMode = computed(() => modeManager.mode.value);
  //总的容器
  const containerRef = ref<HTMLDivElement | null>(null);
  //初始化要展示的focus总容器
  const focusWidgetRef = ref<HTMLDivElement | null>(null);
  //是否要动画
  const focusTransition = ref<boolean>(true);
  //当前focus的元素
  const focusedElement = ref<IElementSchema | null>(null);

  //当前focus的元素的dom实例 - 使用共享逻辑
  const focusedElementDom = computed(() =>
    getElementDomInstance(elementManager, focusedElement.value)
  );

  const initCanvas = (ref: HTMLDivElement) => {
    containerRef.value = ref;
    //且需要监听他的滚动，给赋值
    containerRef.value?.addEventListener("scroll", () => {
      setFocusWidgetStyle();
    });
    startObserver();
  };

  //画布的点击 取消所有的focus
  const handleCanvasClick = (e: MouseEvent) => {
    e.preventDefault();
    resetFocus();
  };

  //初始化这个focus的物件ref
  const setFocusWidgetRef = (el: HTMLDivElement) => {
    focusWidgetRef.value = el;
  };

  //修改这个focus物件的样式
  const setFocusWidgetStyle = () => {
    if (
      !focusedElementDom.value ||
      !containerRef.value ||
      !focusWidgetRef.value
    ) {
      return;
    }

    // 获取容器和元素的边界信息
    const containerRect = containerRef.value.getBoundingClientRect();
    const elementRect =
      focusedElementDom.value.getBoundingClientRect() ||
      focusedElementDom.value.nextElementSibling?.getBoundingClientRect();

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

    // 设置焦点框的样式
    const focusWidget = focusWidgetRef.value;
    focusWidget.style.left = `${relativeLeft}px`;
    focusWidget.style.top = `${relativeTop}px`;
    focusWidget.style.width = `${elementRect.width}px`;
    focusWidget.style.height = `${elementRect.height}px`;

    // 更新焦点框的矩形信息
    focusWidgetRect.value = {
      left: relativeLeft,
      top: relativeTop,
      width: elementRect.width,
      height: elementRect.height,
    };
  };

  //初始化dom监听实例(拿到的是实例和config)
  const { startObserver, stopObserver } = useMutationObserver(
    containerRef,
    setFocusWidgetStyle
  );
  const { startTimedQuery, stopTimedQuery } =
    useTimedQuery(setFocusWidgetStyle);

  const handleFocus = (focusInstanceSchema: IElementSchema, e?: MouseEvent) => {
    e?.stopPropagation();
    //比较进来的 如果已经就是当前的 就不用动了
    if (!isEqual(focusedElement.value, focusInstanceSchema)) {
      focusedElement.value = focusInstanceSchema;
    }
  };

  const handleFocusById = (id: string) => {
    const elementSchema = elementManager.getElementById(id);
    if (elementSchema) {
      focusedElement.value = elementSchema;
    }
  };

  const resetFocus = () => {
    focusedElement.value = null;
  };

  onUnmounted(() => {
    stopObserver();
  });

  return {
    focusedElement,
    focusedElementDom,
    focusWidgetRect,
    focusTransition,
    initCanvas,
    handleFocus,
    setFocusWidgetRef,
    handleCanvasClick,
    startFocusTimedQuery: startTimedQuery,
    stopFocusTimedQuery: stopTimedQuery,
    resetFocus,
    setFocusWidgetStyle,
    forceSetFocusWidgetStyle: setFocusWidgetStyle,
    handleFocusById,
  };
};
