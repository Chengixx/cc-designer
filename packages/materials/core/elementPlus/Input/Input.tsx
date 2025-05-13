import { IEditorElement } from "@cgx-designer/types";
import { ElInput } from "element-plus";
import { defineComponent, PropType, ref } from "vue";
import { isEmpty } from "lodash-es";
import { exposeDom } from "@cgx-designer/utils";

const Input = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs, expose, slots }) {
    const elementRef = ref<any>(null);
    expose(exposeDom(elementRef));
    return () => {
      const renderProps: Record<string, any> = {
        ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
        ...attrs,
      };
      //Todo 这里不知道为什么给ref有ts报错啊
      return (
        <ElInput {...renderProps} ref={elementRef as any}>
          {{
            ...slots,
          }}
        </ElInput>
      );
    };
  },
});

export default Input;
