import { nextTick, Ref, ref, watch } from "vue";
import { ElementManage, IEditorElement } from "./useElement";
import { isEqual } from "lodash";
import useObserve from "./useObserve";

export interface FocusManage {
  focusedElement: Ref<IEditorElement | null>;
  handleFocus: (
    focusInstanceSchema: IEditorElement,
    elementManage: ElementManage,
    e?: MouseEvent
  ) => void;
  setFocusWidgetRef: (el: HTMLDivElement) => void;
  handleCanvasClick: (e: MouseEvent) => void;
  resetFocus: (elements?: IEditorElement[]) => void;
}

export const useFocus = (): FocusManage => {
  //初始化要展示的hover总容器
  const focusWidgetRef = ref<HTMLDivElement | null>(null);
  //当前focus的元素
  const focusedElement = ref<IEditorElement | null>(null);
  //当前focus的元素的dom实例
  const foucusedElementDom = ref<HTMLElement | null>(null);
  //画布的点击 取消所有的focus
  const handleCanvasClick = (e: MouseEvent) => {
    e.preventDefault();
    resetFocus();
  };

  //初始化这个hover的物件ref
  const setFocusWidgetRef = (el: HTMLDivElement) => {
    focusWidgetRef.value = el;
  };

  //修改这个hover物件的样式
  const setFocusWidgetStyle = () => {
    const rect =
      foucusedElementDom.value?.getBoundingClientRect() ??
      foucusedElementDom.value?.nextElementSibling?.getBoundingClientRect();
    console.log(rect, "这里");
    //!还有一个滚动条的长度
    focusWidgetRef.value!.style.left = rect!.left - 280 + 4 + "px";
    focusWidgetRef.value!.style.top = rect!.top - 80 + "px";
    focusWidgetRef.value!.style.width = rect?.width + "px";
    focusWidgetRef.value!.style.height = rect?.height + "px";
  };

  //初始化dom监听实例(拿到的是实例和config)
  const { mutationObserver, observerConfig } = useObserve(setFocusWidgetStyle);

  const handleFocus = (
    focusInstanceSchema: IEditorElement,
    elementManage: ElementManage,
    e?: MouseEvent
  ) => {
    e?.stopPropagation();
    //比较进来的 如果已经就是当前的 就不用动了
    if (!isEqual(focusedElement.value, focusInstanceSchema)) {
      focusedElement.value = focusInstanceSchema;
      //拿到实例的dom
      foucusedElementDom.value =
        elementManage.elementInstanceList.value[focusInstanceSchema.id];
      setFocusWidgetStyle();
    }
  };

  const resetFocus = () => {
    focusedElement.value = null;
  };

  watch(
    () => foucusedElementDom.value,
    (currendFocusedElementDom, _) => {
      //拿到了新的元素是要对其进行监听的，我写了一个hook
      if (currendFocusedElementDom) {
        mutationObserver.observe(currendFocusedElementDom, observerConfig);
      }
    }
  );

  return {
    focusedElement,
    handleFocus,
    setFocusWidgetRef,
    handleCanvasClick,
    resetFocus,
  };
};
