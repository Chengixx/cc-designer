import { IEditorElement } from "@/types";
import { ElementConfig } from "@cgx-designer/utils";
import { ElFormItem } from "element-plus";
import {
  ComponentPublicInstance,
  defineComponent,
  h,
  inject,
  onUnmounted,
  PropType,
  ref,
  watchEffect,
} from "vue";
import { ElementManage } from "@cgx-designer/hooks";

const ElementNode = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const elementManage = inject("elementManage") as ElementManage;
    const elementRef = ref<ComponentPublicInstance>();
    watchEffect(() => {
      if (elementRef.value) {
        // console.log(elementRef.value);
        let el = elementRef.value.$el;
        //如果是分割线 给他用父亲的
        if (
          props.elementSchema.key === "divider" ||
          props.elementSchema.key === "text" ||
          props.elementSchema.key === "button"
        ) {
          el = elementRef.value.$el.parentElement;
        }
        elementManage.addElementInstance(props.elementSchema.id, el);
      }
    });
    onUnmounted(() => {
      // console.log("触发销毁", props.element);
      elementManage.deleteElementInstance(props.elementSchema.id);
    });
    return () => {
      //先从元素配置那里拿到
      const elementConfig = inject<ElementConfig>("elementConfig");
      //渲染出来的组件
      const elementRender =
        elementConfig?.elementRenderMap[props.elementSchema.key];
      return (
        <>
          {/* //!当前选中的元素不是row 就普通元素 然后如果是有默认值 */}
          {/* //!也就是表单元素的 就要加ElFormItem 为了更好的体验而已 */}
          {Object.keys(props.elementSchema.props).includes("defaultValue") ? (
            <ElFormItem
              for="-"
              ref={elementRef}
              label={
                !!props.elementSchema.props.label
                  ? props.elementSchema.props.label
                  : props.elementSchema.key
              }
              class="w-full"
              labelPosition={props.elementSchema.props.labelPosition}
              style={{ marginBottom: "0px !important" }}
              prop={new Date().getTime().toString() + props.elementSchema.key}
            >
              {h(elementRender, { elementSchema: props.elementSchema })}
            </ElFormItem>
          ) : (
            <>
              {h(
                elementRender,
                { elementSchema: props.elementSchema, ref: elementRef },
                {
                  // 这个是普通的插槽,就是给他一个个循环出来就好了不用过多的操作
                  node: (childElementSchema: IEditorElement) => {
                    // return elementList.map((element) => {
                    return <ElementNode elementSchema={childElementSchema} />;
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
