import { IEditorElement } from "@cgx-designer/core";
import { VColorPicker } from "vuetify/components";
import { defineComponent, PropType } from "vue";

const ColorPicker = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
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
