import { computed, Ref, ref } from "vue";
import { ElementManage } from "./useElement";
import { isEqual } from "lodash";
import { useObserve } from "./useObserve";
import { useTimedQuery } from "./useTimedQuery";
import { IEditorElement } from "cgx-designer";

export interface FocusManage {
  focusedElement: Ref<IEditorElement | null>;
  focusTransition: Ref<boolean>;
  initCanvas: (ref: HTMLDivElement) => void;
  handleFocus: (focusInstanceSchema: IEditorElement, e?: MouseEvent) => void;
  setFocusWidgetRef: (el: HTMLDivElement) => void;
  handleCanvasClick: (e: MouseEvent) => void;
  resetFocus: (elements?: IEditorElement[]) => void;
  setFocusWidgetStyle: () => void;
  startFocusTimedQuery: () => void;
  stopFocusTimedQuery: () => void;
}

export const useFocus = (elementManage: ElementManage): FocusManage => {
  //总的容器
  const containerRef = ref<HTMLDivElement | null>(null);
  //初始化要展示的focus总容器
  const focusWidgetRef = ref<HTMLDivElement | null>(null);
  //是否要动画
  const focusTransition = ref<boolean>(true);
  //当前focus的元素
  const focusedElement = ref<IEditorElement | null>(null);
  //当前focus的元素的dom实例
  const foucusedElementDom = computed(() => {
    if (!focusedElement.value) return null;
    return elementManage.elementInstanceList.value[focusedElement.value!.id];
  });
  const initCanvas = (ref: HTMLDivElement) => {
    containerRef.value = ref;
    //且需要监听他的滚动，给赋值
    containerRef.value?.addEventListener("scroll", () => {
      setFocusWidgetStyle();
    });
    mutationObserver.observe(document.body, observerConfig);
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
    if (!foucusedElementDom.value) return;
    const { top: containerTop, left: containerLeft } =
      containerRef.value!.getBoundingClientRect();
    const { top, left, width, height } =
      foucusedElementDom.value?.getBoundingClientRect() ??
      foucusedElementDom.value?.nextElementSibling?.getBoundingClientRect();
    focusWidgetRef.value!.style.left = left - containerLeft + "px";
    focusWidgetRef.value!.style.top =
      top - containerTop + containerRef.value?.scrollTop! + "px";
    focusWidgetRef.value!.style.width = width + "px";
    focusWidgetRef.value!.style.height = height + "px";
  };

  //初始化dom监听实例(拿到的是实例和config)
  const { mutationObserver, observerConfig } = useObserve(setFocusWidgetStyle);
  const { startTimedQuery, stopTimedQuery } =
    useTimedQuery(setFocusWidgetStyle);

  const startFocusTimedQuery = () => {
    startTimedQuery();
  };
  const stopFocusTimedQuery = () => {
    stopTimedQuery();
  };

  const handleFocus = (focusInstanceSchema: IEditorElement, e?: MouseEvent) => {
    e?.stopPropagation();
    //比较进来的 如果已经就是当前的 就不用动了
    if (!isEqual(focusedElement.value, focusInstanceSchema)) {
      focusedElement.value = focusInstanceSchema;
    }
  };

  const resetFocus = () => {
    focusedElement.value = null;
  };

  return {
    focusedElement,
    focusTransition,
    initCanvas,
    handleFocus,
    setFocusWidgetRef,
    handleCanvasClick,
    startFocusTimedQuery,
    stopFocusTimedQuery,
    resetFocus,
    setFocusWidgetStyle,
  };
};
