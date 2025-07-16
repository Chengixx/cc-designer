import { VSwitch } from "vuetify/components";
import { defineComponent } from "vue";
import { isEmpty } from "lodash-es";
import { createElementProps } from "@cgx-designer/utils";

const Switch = defineComponent({
  props: createElementProps(),
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
