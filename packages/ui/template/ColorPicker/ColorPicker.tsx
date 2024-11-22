import { IEditorElement } from "@cgx-designer/core";
import { ElColorPicker } from "element-plus";
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
      return <ElColorPicker {...renderProps} />;
    };
  },
});

export default ColorPicker;
