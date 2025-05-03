import { IEditorElement } from "@cgx-designer/types";
import { VSwitch } from "vuetify/components";
import { defineComponent, PropType } from "vue";
import { isEmpty } from "lodash";

const Switch = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
        ...attrs,
      };
      return <VSwitch {...renderProps} />;
    };
  },
});

export default Switch;
