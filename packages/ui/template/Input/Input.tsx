import { IEditorElement } from "cgx-designer";
import { ElInput } from "element-plus";
import { defineComponent, PropType } from "vue";

const Input = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <ElInput
          placeholder={props.elementSchema.props.placeHolder}
          size={props.elementSchema.props.size}
          v-model={props.elementSchema.props.defaultValue}
        />
      );
    };
  },
});

export default Input;
