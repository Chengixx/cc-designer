import { IEditorElement } from "@cgx-designer/types";
import { ElButton } from "element-plus";
import { defineComponent, PropType } from "vue";
import { isEmpty } from "lodash";

const Button = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
        ...attrs,
      };
      return (
        <ElButton {...renderProps}>
          {{
            ...slots,
            default: () => {
              return !isEmpty(props.elementSchema)
                ? props.elementSchema.props!.label
                : slots.default?.();
            },
          }}
        </ElButton>
      );
    };
  },
});

export default Button;
