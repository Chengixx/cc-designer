import { ElInput } from "element-plus";
import { defineComponent } from "vue";

const Input = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props: any) {
    return () => {
      return (
        <ElInput
          placeholder={props.elementSchema.props!.placeHolder}
          size={props.elementSchema.props!.size}
          v-model={props.elementSchema.props!.defaultValue}
        ></ElInput>
      );
    };
  },
});

export default Input;
