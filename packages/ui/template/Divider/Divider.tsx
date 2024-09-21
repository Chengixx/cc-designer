import { IEditorElement } from "cgx-designer";
import { ElDivider } from "element-plus";
import { defineComponent, PropType } from "vue";

const Divider = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return <ElDivider>{props.elementSchema.props.placeHolder}</ElDivider>;
    };
  },
});

export default Divider;
