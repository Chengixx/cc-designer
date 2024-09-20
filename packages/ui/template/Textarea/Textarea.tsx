import { ElInput } from "element-plus";
import { defineComponent } from "vue";

const Textarea = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props) {
    return () => {
      return (
        <ElInput
          type="textarea"
          placeholder={props.elementSchema!.props!.placeHolder}
          size={props.elementSchema!.props!.size}
          v-model={props.elementSchema!.props!.defaultValue}
        />
      );
    };
  },
});

export default Textarea;
