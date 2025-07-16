import { isEmpty } from "lodash-es";
import { defineComponent } from "vue";
import { VBtn } from "vuetify/components";
import { createElementProps } from "@cgx-designer/utils";

const Button = defineComponent({
  props: createElementProps(),
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
