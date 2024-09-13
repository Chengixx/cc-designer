import { Ref, ref } from "vue";
import { IEditorElement } from "./useElement";
import { isEqual } from "lodash";

export interface FocusManage {
  focusedElement: Ref<IEditorElement | null>;
  handleFocus: (element: IEditorElement, e?: MouseEvent) => void;
  handleCanvasClick: (e: MouseEvent) => void;
  resetFocus: (elements?: IEditorElement[]) => void;
}

export const useFocus = (): FocusManage => {
  const focusedElement = ref<IEditorElement | null>(null);
  const handleCanvasClick = (e: MouseEvent) => {
    e.preventDefault();
    resetFocus();
  };

  const handleFocus = (element: IEditorElement, e?: MouseEvent) => {
    // console.log("看一下传进来的元素", element);
    e?.stopPropagation();
    //比较进来的 如果已经就是当前的 就不用动了
    if (!isEqual(focusedElement.value, element)) {
      focusedElement.value = element;
    }
  };

  const resetFocus = () => {
    focusedElement.value = null;
  };

  return {
    focusedElement,
    handleFocus,
    handleCanvasClick,
    resetFocus,
  };
};
