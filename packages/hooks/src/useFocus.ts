import { computed, onUnmounted, ref } from "vue";
import { ElementManage } from "./useElement";
import { isEqual } from "lodash";
import { useObserve } from "./useObserve";
import { useTimedQuery } from "./useTimedQuery";
import { useParentDomList } from "@cgx-designer/core/src/constant";
import { IEditorElement } from "@cgx-designer/core";
import { ModeManage } from "./useMode";

export type FocusManage = ReturnType<typeof useFocus>;

export const useFocus = (
  elementManage: ElementManage,
  modeManage: ModeManage
) => {
  //当前手机还是电脑还是平板模式
  const currentMode = computed(() => modeManage.mode.value);
  //总的容器
  const containerRef = ref<HTMLDivElement | null>(null);
  //初始化要展示的focus总容器
  const focusWidgetRef = ref<HTMLDivElement | null>(null);
  //是否要动画
  const focusTransition = ref<boolean>(true);
  //当前focus的元素
  const focusedElement = ref<IEditorElement | null>(null);
  //当前focus的元素的dom实例
  const focusedElementDom = computed(() => {
    const id = focusedElement.value?.id;
    const elementInstance = elementManage.getElementInstanceById(id!);
    if (!id || !elementInstance) return null;
    //如果是表单组件,就给表单的item
    if (
      focusedElement.value?.formItem &&
      !!!focusedElement.value.noShowFormItem
    ) {
      return elementManage.elementInstanceList.value[
        focusedElement.value?.id + "-form-item"
      ].$el;
    }
    if (elementInstance.$el.nodeName === "#text") {
      return null;
    }
    //默认给一个$el实例
    if (useParentDomList.includes(focusedElement.value?.key!)) {
      return elementInstance.$el.parentElement;
    } else {
      return elementInstance.$el;
    }
  });
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
    if (!focusedElementDom.value) return;
    const { top: containerTop, left: containerLeft } =
      containerRef.value!.getBoundingClientRect();
    const { top, left, width, height } =
      focusedElementDom.value?.getBoundingClientRect() ??
      focusedElementDom.value?.nextElementSibling?.getBoundingClientRect();
    const modeStyle =
      currentMode.value !== "pc" ? { left: 10, top: 10 } : { left: 0, top: 0 };
    focusWidgetRef.value!.style.left =
      left - containerLeft - modeStyle.left + "px";
    focusWidgetRef.value!.style.top =
      top -
      containerTop +
      containerRef.value?.scrollTop! -
      modeStyle.top +
      "px";
    focusWidgetRef.value!.style.width = width + "px";
    focusWidgetRef.value!.style.height = height + "px";
  };

  //强制修改一次focus的样式
  const forceSetFocusWidgetStyle = () => {
    setFocusWidgetStyle();
  };

  //初始化dom监听实例(拿到的是实例和config)
  const { startObserver, stopObserver } = useObserve(
    document.body,
    setFocusWidgetStyle
  );
  const { startTimedQuery, stopTimedQuery } =
    useTimedQuery(setFocusWidgetStyle);

  const startFocusTimedQuery = () => {
    startTimedQuery();
  };
  const stopFocusTimedQuery = () => {
    stopTimedQuery();
  };

  const handleFocus = (focusInstanceSchema: IEditorElement, e?: MouseEvent) => {
    if (e) {
      e?.stopPropagation();
    }
    //比较进来的 如果已经就是当前的 就不用动了
    if (!isEqual(focusedElement.value, focusInstanceSchema)) {
      focusedElement.value = focusInstanceSchema;
    }
  };

  const handleFocusById = (id: string) => {
    const elementSchema = elementManage.findElementById(id);
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
    focusTransition,
    initCanvas,
    handleFocus,
    setFocusWidgetRef,
    handleCanvasClick,
    startFocusTimedQuery,
    stopFocusTimedQuery,
    resetFocus,
    setFocusWidgetStyle,
    forceSetFocusWidgetStyle,
    handleFocusById,
  };
};
