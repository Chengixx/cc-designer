import { IEditorElement } from "cgx-designer";
import { ElInput } from "element-plus";
import { defineComponent, PropType } from "vue";

const Input = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
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
