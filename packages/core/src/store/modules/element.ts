import { ref } from "vue";
import { defineStore } from "pinia";
import store from "../index";
import { v4 as uuid } from "uuid";
import { IElementBaseSetting, elementConfig } from "@/config/elementCreator";
import { deepClone } from "@/utils";
import useFocus from "@/hook/useFocus";

export interface IEditorElement {
  focus: boolean;
  id: string | number;
  key: string;
  cols?: IEditorElement[];
  elementList?: IEditorElement[] | [];
  props: Record<string, any>;
}
export interface TreeNode {
  id: string;
  key: string;
  children?: TreeNode[];
}
export const useElementStore = defineStore("element", () => {
  const elementTemplate = elementConfig.elementTemplate;
  const elementList = ref<IEditorElement[]>([]);
  const elementInstanceList = ref<Record<string, HTMLBaseElement>>({});
  const addElementInstance = (id: string, dom: HTMLBaseElement) => {
    elementInstanceList.value[id] = dom;
  };
  const deleteElementInstance = (id: string) => {
    delete elementInstanceList.value[id];
  };
  //树形结构
  const tree = ref<TreeNode[]>([]);
  const setElementList = (newElements: IEditorElement[]) => {
    // console.log("也应该走到这", newElements);
    elementList.value = newElements;
    // console.log("修改之后", elementList.value);
  };
  const deleteElementById = (
    id: string | number,
    elements: IEditorElement[] = elementList.value,
    //!是为了最后一个col删除的时候，删除父级row
    rowParent?: IEditorElement
  ): IEditorElement[] | null => {
    for (let item of elements) {
      if (item.id === id) {
        elements.splice(elements.indexOf(item), 1);
        //删除之后看一下cols，如果已经没有cols了，就可以删除row了
        //!此循环是为了最后一个col删除的时候，删除父级row
        if (rowParent?.cols?.length === 0) {
          deleteElementById(rowParent.id);
        }
      }
      if (item.cols) {
        deleteElementById(id, item.cols, item);
      }
      if (item.elementList) {
        deleteElementById(id, item.elementList);
      }
    }
    const result = deepClone(elementList.value);
    return result;
  };
  const deleteAllElements = (): IEditorElement[] | null => {
    elementList.value = [];
    const result = deepClone(elementList.value);
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
      if (item.cols) {
        const colResult = findElementById(id, item.cols);
        if (colResult) {
          result = colResult;
        }
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
  const addNewElement = (
    newElement: IElementBaseSetting,
    index: number,
    list: IEditorElement[]
  ) => {
    list.splice(index as number, 0, elementTemplate[newElement.key](uuid));
  };
  const addElementFromLast = (newElement: IElementBaseSetting) => {
    elementList.value.push(elementTemplate[newElement.key](uuid));
    const result = deepClone(elementList.value);
    return result;
  };
  const addColForRow = (): IEditorElement[] | null => {
    if (useFocus().getFocusElement()) {
      useFocus().getFocusElement()!.cols!.push(elementTemplate["col"](uuid));
    }
    const result = deepClone(elementList.value);
    return result;
  };

  const listToTree = (element: IEditorElement, treeNode: TreeNode[]) => {
    let curNode: TreeNode = {
      id: element.id as string,
      key: element.key,
    };
    treeNode.push(curNode);
    curNode.children = [];
    if (element.key === "row") {
      element.cols!.forEach((col) => {
        let colNode = {
          id: col.id as string,
          key: col.key,
          children: [],
        };
        curNode.children!.push(colNode);
        if (col.elementList!.length > 0) {
          col.elementList!.forEach((colWidget) =>
            listToTree(colWidget, colNode.children)
          );
        }
      });
    }
    if (element.key === "card") {
      element.elementList!.forEach((sonElement) =>
        listToTree(sonElement, curNode.children!)
      );
    }
  };
  const getTree = (): TreeNode[] => {
    tree.value = [];
    useElementStore().elementList.forEach((element) =>
      listToTree(element, tree.value)
    );

    return tree.value;
  };
  return {
    elementList,
    addNewElement,
    setElementList,
    deleteElementInstance,
    deleteElementById,
    addElementFromLast,
    getTree,
    findElementById,
    addColForRow,
    deleteAllElements,
    elementInstanceList,
    addElementInstance,
  };
});

/** 在 setup 外使用 */
export function useElementStoreHook() {
  return useElementStore(store);
}
