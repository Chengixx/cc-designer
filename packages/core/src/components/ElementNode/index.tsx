import { ElementConfig } from "@cgx-designer/utils";
import { ElFormItem } from "element-plus";
import { defineComponent, h, inject } from "vue";

const ElementNode = defineComponent({
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      //先从元素配置那里拿到
      const elementConfig = inject<ElementConfig>("elementConfig");
      //渲染出来的组件
      const elementRender = elementConfig?.elementRenderMap[props.element!.key];
      return (
        <>
          {/* //!当前选中的元素不是row 就普通元素 然后如果是有默认值 */}
          {/* //!也就是表单元素的 就要加ElFormItem 为了更好的体验而已 */}
          {Object.keys(props.element!.props).includes("defaultValue") ? (
            <ElFormItem
              label={
                !!props.element!.props.label
                  ? props.element!.props.label
                  : props.element!.key
              }
              class="w-full"
              labelPosition={props.element!.props.labelPosition}
              style={{ marginBottom: "0px !important" }}
            >
              {h(elementRender, props.element!)}
            </ElFormItem>
          ) : (
            <>{h(elementRender, props.element!)}</>
          )}
        </>
      );
    };
  },
});

export default ElementNode;
