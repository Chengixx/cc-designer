import { isFunction } from "lodash";
import { defineComponent } from "vue";
import { isArray } from "lodash";
import {
  isVNode,
  type VNode,
  type VNodeChild,
  type VNodeNormalizedChildren,
} from "vue";

export type VNodeChildAtom = Exclude<VNodeChild, Array<any>>;
export type RawSlots = Exclude<
  VNodeNormalizedChildren,
  Array<any> | null | string
>;
export type FlattenVNodes = Array<VNodeChildAtom | RawSlots>;

export const flattedChildren = (
  children: FlattenVNodes | VNode | VNodeNormalizedChildren
): FlattenVNodes => {
  const vNodes = isArray(children) ? children : [children];
  const result: FlattenVNodes = [];

  vNodes.forEach((child) => {
    if (isArray(child)) {
      result.push(...flattedChildren(child));
    } else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children));
    } else {
      result.push(child);
      if (isVNode(child) && child.component?.subTree) {
        result.push(...flattedChildren(child.component.subTree));
      }
    }
  });
  return result;
};

export const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object, Function],
      required: true,
    },
  },
  setup(props) {
    return () => (isFunction(props.vNode) ? props.vNode() : props.vNode);
  },
});
