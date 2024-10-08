import { IEditorElement } from "cgx-designer";
import { ElColorPicker } from "element-plus";
import { defineComponent, PropType } from "vue";

const ColorPicker = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <ElColorPicker
          size={props.elementSchema.props.size}
          v-model={props.elementSchema.props.defaultValue}
        />
      );
    };
  },
});

export default ColorPicker;
