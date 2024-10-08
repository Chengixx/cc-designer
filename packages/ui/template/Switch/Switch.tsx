import { IEditorElement } from "cgx-designer";
import { ElSwitch } from "element-plus";
import { defineComponent, PropType } from "vue";

const Switch = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <ElSwitch
          size={props.elementSchema.props.size}
          v-model={props.elementSchema.props.defaultValue}
        />
      );
    };
  },
});

export default Switch;
