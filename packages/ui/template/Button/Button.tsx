import { IEditorElement } from "cgx-designer";
import { ElButton } from "element-plus";
import { defineComponent, PropType } from "vue";

const Button = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <ElButton
          size={props.elementSchema.props.size}
          type={props.elementSchema.props.type}
        >
          {props.elementSchema.props.label}
        </ElButton>
      );
    };
  },
});

export default Button;
