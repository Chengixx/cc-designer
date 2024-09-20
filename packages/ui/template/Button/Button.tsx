import { ElButton } from "element-plus";
import { defineComponent } from "vue";

const Button = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props: any) {
    return () => {
      return (
        <ElButton
          size={props.elementSchema.props!.size}
          type={props.elementSchema.props!.type}
        >
          {props.elementSchema.props!.label}
        </ElButton>
      );
    };
  },
});

export default Button;
