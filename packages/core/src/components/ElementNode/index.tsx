import { IEditorElement } from "@/types";
import { ElementConfig } from "@cgx-designer/utils";
import { ElFormItem } from "element-plus";
import { defineComponent, h, inject, PropType } from "vue";
import Draggle from "../EdiorCanvas/components/Draggle.vue";

const ElementNode = defineComponent({
  props: {
    element: {
      type: Object as PropType<IEditorElement>,
      required: true,
    },
  },
  setup(props, { slots }) {
    console.log("第二层的slots",slots);
    return () => {
      //先从元素配置那里拿到
      const elementConfig = inject<ElementConfig>("elementConfig");
      //渲染出来的组件
      const elementRender = elementConfig?.elementRenderMap[props.element.key];
      return (
        <>
          {/* //!当前选中的元素不是row 就普通元素 然后如果是有默认值 */}
          {/* //!也就是表单元素的 就要加ElFormItem 为了更好的体验而已 */}
          {Object.keys(props.element.props).includes("defaultValue") ? (
            <ElFormItem
              label={
                !!props.element.props.label
                  ? props.element.props.label
                  : props.element.key
              }
              class="w-full"
              labelPosition={props.element.props.labelPosition}
              style={{ marginBottom: "0px !important" }}
            >
              {h(elementRender, { elementSchema: props.element })}
            </ElFormItem>
          ) : (
            <>
              {h(
                elementRender,
                { elementSchema: props.element },
                {
                  // 这个是普通的插槽,就是给他一个个循环出来就好了不用过多的操作
                  node: (element: IEditorElement) => {
                    // return elementList.map((element) => {
                      return <ElementNode element={element} />;
                    // });
                  },
                  //这个是拖拽的插槽，应该要用draggle,这里会提供一个插槽 到外面如果需要拖拽的话 是用插槽穿进来的
                  editNode: () => {
                    return <>{slots.editNode ? slots.editNode() : null}</>;
                  },
                }
              )}
            </>
          )}
        </>
      );
    };
  },
});

export default ElementNode;
