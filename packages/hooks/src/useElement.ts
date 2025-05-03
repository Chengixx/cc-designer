import { ref } from "vue";
import { cloneDeep, isEmpty } from "lodash";
import { ElementInstance, IEditorElement } from "@cgx-designer/types";
import { getRandomId } from "@cgx-designer/utils";
import { deepClone } from "./../../utils/common/util";

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

  const deepCopyElement = (elementSchema: IEditorElement) => {
    let newElementSchema: IEditorElement | {} = {};
    const id = getRandomId();
    for (let key in elementSchema) {
      if (key === "id") {
        newElementSchema[key] = id;
      } else if (key === "field") {
        newElementSchema[key] = elementSchema.key + "-" + id;
      } else if (key === "elementList" && !isEmpty(elementSchema[key])) {
        newElementSchema[key] = []
        for (let index = 0; index < elementSchema[key]!.length; index++) {
          newElementSchema[key][index] = deepCopyElement(elementSchema[key]![index]!);
        }
      } else {
        newElementSchema[key] = elementSchema[key];
      }
    }

    return newElementSchema;
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
    deepCopyElement,
  };
};
