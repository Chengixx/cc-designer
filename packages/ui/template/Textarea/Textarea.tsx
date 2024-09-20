import { IEditorElement } from "cgx-designer";
import { ElInput } from "element-plus";
import { defineComponent, PropType } from "vue";

const Textarea = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
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
