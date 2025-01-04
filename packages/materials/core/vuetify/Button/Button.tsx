import { IEditorElement } from "@cgx-designer/core";
import { defineComponent, PropType } from "vue";
import { VBtn } from "vuetify/components";

const Button = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <VBtn {...renderProps}>{props.elementSchema.props!.label}</VBtn>;
    };
  },
});

export default Button;
