import { ElColorPicker } from "element-plus";
import { defineComponent } from "vue";

const ColorPicker = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props: any) {
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
