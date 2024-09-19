import { Ref, ref } from "vue";
import { v4 as uuid } from "uuid";
import { IElementBaseSetting, elementConfig } from "@cgx-designer/utils";
import { cloneDeep } from "lodash";
import { IEditorElement, TreeNode } from "cgx-designer";

export interface ElementManage {
  elementList: Ref<IEditorElement[]>;
  setElementList: (newElements: IEditorElement[]) => void;
  elementInstanceList: Ref<Record<string, HTMLBaseElement>>;
  addElementInstance: (id: string, dom: HTMLBaseElement) => void;
  deleteElementInstance: (id: string) => void;
  deleteElementById: (
    id: string,
    elements?: IEditorElement[],
    rowParent?: IEditorElement
  ) => IEditorElement[] | null;
  addElementFromLast: (
    newElement: IElementBaseSetting
  ) => IEditorElement[] | null;
  getTree: () => TreeNode[];
  findElementById: (
    id: string,
    elements?: IEditorElement[]
  ) => IEditorElement | null;
  addColForRow: (id: string) => IEditorElement[] | null;
  deleteAllElements: () => IEditorElement[] | null;
}


export const useElement = (): ElementManage => {
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
    elementList.value = newElements;
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
        //删除之后看一下还有没有col，如果已经没有col了，就可以删除row了
        //!此循环是为了最后一个col删除的时候，删除父级row
        if (rowParent?.elementList?.length === 0) {
          deleteElementById(rowParent.id);
        }
      }
      if (item.elementList && item.key === "row") {
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
  const addElementFromLast = (newElement: IElementBaseSetting) => {
    elementList.value.push(elementTemplate[newElement.key](uuid));
    const result = cloneDeep(elementList.value);
    return result;
  };
  const addColForRow = (id: string): IEditorElement[] | null => {
    const row = findElementById(id);
    if (row) {
      row.elementList!.push(elementTemplate["col"](uuid));
    }
    const result = cloneDeep(elementList.value);
    return result;
  };

  const listToTree = (element: IEditorElement, treeNode: TreeNode[]) => {
    let curNode: TreeNode = {
      id: element.id as string,
      key: element.key,
    };
    treeNode.push(curNode);
    curNode.children = [];
    if (element.elementList) {
      element.elementList.forEach((sonElement) =>
        listToTree(sonElement, curNode.children!)
      );
    }
  };
  const getTree = (): TreeNode[] => {
    tree.value = [];
    elementList.value.forEach((element) => listToTree(element, tree.value));

    return tree.value;
  };
  return {
    elementList,
    elementInstanceList,
    setElementList,
    deleteElementInstance,
    deleteElementById,
    addElementFromLast,
    getTree,
    findElementById,
    addColForRow,
    deleteAllElements,
    addElementInstance,
  };
};
