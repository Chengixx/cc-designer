import { Ref, ref } from "vue";
import { ElementManage, IEditorElement } from "./useElement";
import { isEqual } from "lodash";

export interface FocusManage {
  focusedElement: Ref<IEditorElement | null>;
  handleFocus: (
    element: IEditorElement,
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
  //画布的点击 取消所有的focus
  const handleCanvasClick = (e: MouseEvent) => {
    e.preventDefault();
    resetFocus();
  };

  //初始化这个hover的物件ref
  const setFocusWidgetRef = (el: HTMLDivElement) => {
    focusWidgetRef.value = el;
  };

  const handleFocus = (
    element: IEditorElement,
    elementManage: ElementManage,
    e?: MouseEvent
  ) => {
    e?.stopPropagation();
    //比较进来的 如果已经就是当前的 就不用动了
    if (!isEqual(focusedElement.value, element)) {
      focusedElement.value = element;
      //拿到实例的dom
      const hoverInstanceDom =
        elementManage.elementInstanceList.value[element.id];
      const rect = hoverInstanceDom.getBoundingClientRect();
      //!还有一个滚动条的长度
      focusWidgetRef.value!.style.left = rect.left - 280 + 4 + "px";
      focusWidgetRef.value!.style.top = rect.top - 80 + "px";
      focusWidgetRef.value!.style.width = rect.width + "px";
      focusWidgetRef.value!.style.height = rect.height + "px";
    }
  };

  const resetFocus = () => {
    focusedElement.value = null;
  };

  return {
    focusedElement,
    handleFocus,
    setFocusWidgetRef,
    handleCanvasClick,
    resetFocus,
  };
};
