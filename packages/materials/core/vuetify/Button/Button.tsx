import { isEmpty } from "lodash-es";
import { defineComponent } from "vue";
import { VBtn } from "vuetify/components";
import { createElementProps } from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const Button = defineComponent({
  props: createElementProps(),
  setup(props, { attrs, slots }) {
    const renderProps = useMergeAttr(props, attrs);
    return () => (
      <VBtn {...renderProps}>
        {{
          ...slots,
          default: () =>
            !isEmpty(props.elementSchema)
              ? props.elementSchema.props!.label
              : slots.default?.(),
        }}
      </VBtn>
    );
  },
});

export default Button;
