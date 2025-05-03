import { IEditorElement } from "@cgx-designer/types";
import { isEmpty } from "lodash";
import { defineComponent, PropType } from "vue";
import { VBtn } from "vuetify/components";

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
        <VBtn {...renderProps}>
          {/* {!isEmpty(props.elementSchema) && props.elementSchema.props!.label} */}
          {{
            ...slots,
            default: () => {
              return !isEmpty(props.elementSchema)
                ? props.elementSchema.props!.label
                : slots.default?.();
            },
          }}
        </VBtn>
      );
    };
  },
});

export default Button;
