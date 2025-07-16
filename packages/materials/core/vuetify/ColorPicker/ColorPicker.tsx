import { VColorPicker } from "vuetify/components";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const ColorPicker = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <VColorPicker {...renderProps} />;
    };
  },
});

export default ColorPicker;
