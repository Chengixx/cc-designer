import { ElButton } from "element-plus";
import { defineComponent } from "vue";
import { isEmpty } from "lodash-es";
import { useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const Button = defineComponent({
  props: createElementProps(),
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
