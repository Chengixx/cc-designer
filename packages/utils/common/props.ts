import { PropType } from "vue";
import { IEditorElement } from "@cgx-designer/types";

/**
 * 创建标准的elementSchema props定义
 * @param additionalProps 额外的自定义props
 * @returns props定义对象
 */
export const createElementProps = <T extends Record<string, any> = {}>(
  additionalProps: T = {} as T
) => {
  return {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      required: false,
      default: () => ({}),
    },
    ...additionalProps,
  } as const;
};

/**
 * 创建必需的elementSchema props定义
 * @param additionalProps 额外的自定义props
 * @returns props定义对象
 */
export const createRequiredElementProps = <T extends Record<string, any> = {}>(
  additionalProps: T = {} as T
) => {
  return {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      required: true,
    },
    ...additionalProps,
  } as const;
};

/**
 * 类型安全的props工厂函数
 * 用于创建包含elementSchema和自定义props的类型定义
 */
export type ElementPropsFactory<T extends Record<string, any> = {}> = {
  elementSchema: {
    type: PropType<IEditorElement>;
    required: boolean;
    default?: () => {};
  };
} & T; 