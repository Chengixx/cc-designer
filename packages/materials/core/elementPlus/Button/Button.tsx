import { IEditorElement } from "@cgx-designer/types";
import { ElButton } from "element-plus";
import { defineComponent, PropType } from "vue";
import { isEmpty } from "lodash-es";
import { useMergeAttr } from "@cgx-designer/hooks";

const Button = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs, slots }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <ElButton {...renderProps}>
          {{
            ...slots,
            default: () => {
              return !isEmpty(props.elementSchema)
                ? renderProps.label
                : slots.default?.();
            },
          }}
        </ElButton>
      );
    };
  },
});

export default Button;
