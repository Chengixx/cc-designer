import { IEditorElement } from "cgx-designer";
import { ElDivider } from "element-plus";
import { defineComponent, PropType } from "vue";

const Divider = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any) {
    return () => {
      return <ElDivider>{props.elementSchema.props.placeHolder}</ElDivider>;
    };
  },
});

export default Divider;
