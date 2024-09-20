import { ElDivider } from "element-plus";
import { defineComponent } from "vue";

const Divider = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props: any) {
    return () => {
      return <ElDivider>{props.elementSchema.props.placeHolder}</ElDivider>;
    };
  },
});

export default Divider;
