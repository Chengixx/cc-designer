import { IEditorElement } from "@/types";
import { ElementConfig } from "@cgx-designer/utils";
import { ElFormItem } from "element-plus";
import {
  ComponentPublicInstance,
  defineComponent,
  h,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { ElementManage } from "@cgx-designer/hooks";

const ElementNode = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      required: true,
    },
    //编辑状态还是预览状态
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    //给个默认值防止拖拽模式报错
    const formData = inject("formData", reactive({})) as any;
    const setFormDataField = () => {
      if (
        formData &&
        typeof props.elementSchema.props.defaultValue !== "undefined" &&
        props.elementSchema.props.defaultValue !== null
      ) {
        formData[props.elementSchema.id] =
          props.elementSchema.props.defaultValue;
      }
    };
    onMounted(() => {
      //如果是有值的 就放进formData里去
      setFormDataField();
    });
    //监听值的变化 如果是有值的，formData里的值要跟着变化
    //todo 不知道为什么这里会触发两次，但是如果直接监听里面的defaultValue是不行的
    watch(
      () => props.elementSchema,
      (nv, ov) => {
        setFormDataField();
      },
      { deep: true }
    );
    const useParentDomList: string[] = ["divider", "text", "button"];
    const elementManage = inject("elementManage") as ElementManage;
    const elementRef = ref<ComponentPublicInstance>();
    watchEffect(() => {
      if (elementRef.value && !props.isPreview) {
        // console.log(elementRef.value);
        let el = elementRef.value.$el;
        //如果是包含以下的 给他用父亲的
        if (useParentDomList.includes(props.elementSchema.key)) {
          el = elementRef.value.$el.parentElement;
        }
        elementManage.addElementInstance(props.elementSchema.id, el);
      }
    });
    onUnmounted(() => {
      // console.log("触发销毁", props.element);
      if (!props.isPreview) {
        elementManage.deleteElementInstance(props.elementSchema.id);
      }
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
              //判断非空必填测试
              // rules={[
              //   {
              //     required: true,
              //     message: `请输入${props.elementSchema.props.label}`,
              //     trigger: "blur",
              //   },
              // ]}
              for="-"
              ref={elementRef}
              label={
                !!props.elementSchema.props.label
                  ? props.elementSchema.props.label
                  : props.elementSchema.key
              }
              class="w-full"
              labelPosition={props.elementSchema.props.labelPosition}
              prop={props.elementSchema.id}
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
                    return (
                      <ElementNode
                        elementSchema={childElementSchema}
                        isPreview={props.isPreview}
                      />
                    );
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
