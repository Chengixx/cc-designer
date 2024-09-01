import { ElementManage, IEditorElement } from "./useElement";

export interface FocusManage {
  handleElementClick: (element: IEditorElement, e?: MouseEvent) => void;
  handleCanvasClick: (e: MouseEvent) => void;
  getFocusElement: (elements?: IEditorElement[]) => IEditorElement | null;
  resetAllElementsUnFocus: (elements?: IEditorElement[]) => void;
}

const useFocus = (elementManage: ElementManage): FocusManage => {
  const handleCanvasClick = (e: MouseEvent) => {
    e.preventDefault();
    resetAllElementsUnFocus();
  };

  const handleElementClick = (element: IEditorElement, e?: MouseEvent) => {
    // console.log("看一下传进来的元素", props.element);
    //阻止冒泡
    e?.stopPropagation();
    //先把原来的全部清空先
    if (element!.focus) {
      // console.log("已经点击的进这里");
      element!.focus = false;
    } else {
      // console.log("没点击的进这里");
      resetAllElementsUnFocus();
      element!.focus = true;
    }
  };

  const resetAllElementsUnFocus = (
    elementList: IEditorElement[] = elementManage.elementList.value
  ) => {
    elementList.forEach((element) => {
      element.focus = false;
      //是row的话要递归处理一下
      if (element.key == "row") {
        //先把里面的cols里面的col都给处理掉先
        element.cols!.forEach((colsElement: IEditorElement) => {
          colsElement.focus = false;
          //再把儿子丢进去 递归处理
          resetAllElementsUnFocus(colsElement.elementList);
        });
      }
      //加入card之后要考虑的更多了
      if (element.elementList) {
        resetAllElementsUnFocus(element.elementList);
      }
    });
  };

  const getFocusElement = (
    elements: IEditorElement[] = elementManage.elementList.value
  ): IEditorElement | null => {
    for (let item of elements) {
      if (item.focus === true) {
        return item;
      }
      if (item.cols) {
        const found = getFocusElement(item.cols);
        if (found) {
          return found;
        }
      }
      if (item.elementList) {
        const found = getFocusElement(item.elementList);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return {
    handleElementClick,
    handleCanvasClick,
    getFocusElement,
    resetAllElementsUnFocus,
  };
};

export default useFocus;
