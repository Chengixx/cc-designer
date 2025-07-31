import { computed } from "vue";
import { ElementManage } from "./useElement";
import { IElementSchema } from "@cgx-designer/types";
import { useParentDomList } from "@cgx-designer/element-designer";

/**
 * 核心的DOM实例获取逻辑
 * 下面的其他函数都基于这个核心逻辑
 */
const getElementDomCore = (
  elementManager: ElementManage,
  elementSchema: IElementSchema | null
): HTMLElement | null => {
  if (!elementSchema?.id) return null;

  const elementInstance = elementManager.getElementInstanceById(
    elementSchema.id
  );
  if (!elementInstance) return null;

  // 如果是表单组件，返回表单的item
  if (elementSchema.formItem && !elementSchema.noShowFormItem) {
    const formItemInstance = elementManager.getElementInstanceById(
      elementSchema.id + "-form-item"
    );
    return formItemInstance?.$el || null;
  }

  // 如果是文本节点，返回null
  if (elementInstance.$el.nodeName === "#text") {
    return null;
  }

  // 如果是需要返回父元素的组件
  if (useParentDomList.includes(elementSchema.key)) {
    return elementInstance.$el.parentElement;
  }

  // 默认返回元素本身
  return elementInstance.$el;
};

/**
 * 获取元素DOM实例的通用逻辑
 * @param elementManager 元素管理器
 * @param elementSchema 元素schema
 * @returns 计算属性，返回对应的DOM实例
 */
export const useElementDom = (elementManager: ElementManage) => {
  const getElementDom = (elementSchema: IElementSchema | null) =>
    getElementDomCore(elementManager, elementSchema);

  return { getElementDom };
};

/**
 * 创建元素DOM实例的计算属性
 * @param elementManager 元素管理器
 * @param elementSchema 元素schema的ref或computed
 * @returns 计算属性，返回对应的DOM实例
 */
export const createElementDomComputed = (
  elementManager: ElementManage,
  elementSchema: IElementSchema | null
) => {
  return computed(() => getElementDomCore(elementManager, elementSchema));
};

/**
 * 通用的元素DOM获取逻辑
 * 这个函数可以直接在computed中使用，避免重复代码
 */
export const getElementDomInstance = (
  elementManager: ElementManage,
  elementSchema: IElementSchema | null
): HTMLElement | null => {
  return getElementDomCore(elementManager, elementSchema);
};
