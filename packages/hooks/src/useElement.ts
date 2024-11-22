import { ref } from "vue";
import { cloneDeep } from "lodash";
import { ElementInstance, IEditorElement } from "@cgx-designer/core";

export type ElementManage = ReturnType<typeof useElement>;

export const useElement = () => {
  const elementList = ref<IEditorElement[]>([]);
  const elementInstanceList = ref<Record<string, ElementInstance>>({});
  const isDesignMode = ref<boolean>(true);
  const setMode = (mode: boolean = false) => {
    isDesignMode.value = mode;
  };
  const addElementInstance = (id: string, dom: ElementInstance) => {
    elementInstanceList.value[id] = dom;
  };
  const deleteElementInstance = (id: string) => {
    delete elementInstanceList.value[id];
  };
  const getElementInstanceById = (id: string) => {
    return elementInstanceList.value[id];
  };
  const setElementList = (newElements: IEditorElement[]) => {
    elementList.value = newElements;
  };
  const deleteElementById = (
    id: string | number,
    elements: IEditorElement[] = elementList.value,
    //!此循环是为了最后一个删除的时候，删除父级
    parentElement?: IEditorElement
  ): IEditorElement[] | null => {
    for (let item of elements) {
      if (item.id === id) {
        elements.splice(elements.indexOf(item), 1);
        //删除之后看一下还有没有col，如果已经没有col了，就可以删除row了
        //!此循环是为了最后一个删除的时候，删除父级
        if (parentElement?.elementList?.length === 0) {
          deleteElementById(parentElement.id!);
        }
      }
      if (item.elementList && (item.key === "row" || item.key === "tab")) {
        deleteElementById(id, item.elementList, item);
      }
      if (item.elementList) {
        deleteElementById(id, item.elementList);
      }
    }
    const result = cloneDeep(elementList.value);
    return result;
  };
  const deleteAllElements = (): IEditorElement[] | null => {
    elementList.value = [];
    const result = cloneDeep(elementList.value);
    return result;
  };
  const findElementById = (
    id: string | number,
    elements: IEditorElement[] = elementList.value
  ): IEditorElement | null => {
    let result: IEditorElement | null = null;
    for (let item of elements) {
      if (item.id === id) {
        result = item;
      }
      if (item.elementList) {
        const elementResult = findElementById(id, item.elementList);
        if (elementResult) {
          result = elementResult;
        }
      }
    }
    return result;
  };
  const findParentElementById = (
    id: string | number,
    elements: IEditorElement[] = elementList.value,
    parentElement: IEditorElement | null = null
  ): IEditorElement | null => {
    let result: IEditorElement | null = null;
    for (let item of elements) {
      if (item.id === id) {
        if (elements === elementList.value) {
          result = null;
        } else {
          result = parentElement!;
        }
      }
      if (item.elementList && result === null) {
        result = findParentElementById(id, item.elementList, item);
      }
    }
    return result;
  };
  const addElementFromLast = (newElementSchema: IEditorElement) => {
    elementList.value.push(newElementSchema);
    const result = cloneDeep(elementList.value);
    return result;
  };

  return {
    elementList,
    elementInstanceList,
    isDesignMode,
    setMode,
    setElementList,
    deleteElementInstance,
    getElementInstanceById,
    findParentElementById,
    deleteElementById,
    addElementFromLast,
    findElementById,
    deleteAllElements,
    addElementInstance,
  };
};
