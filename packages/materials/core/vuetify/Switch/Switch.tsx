import { IEditorElement } from "@cgx-designer/core";
import { VSwitch } from "vuetify/components";
import { defineComponent, PropType } from "vue";

const Switch = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <VSwitch {...renderProps} />;
    };
  },
});

export default Switch;
