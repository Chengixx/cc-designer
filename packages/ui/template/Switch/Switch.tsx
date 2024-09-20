import { ElSwitch } from "element-plus";
import { defineComponent } from "vue";

const Switch = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props) {
    return () => {
      return (
        <ElSwitch
          size={props.elementSchema!.props!.size}
          v-model={props.elementSchema!.props!.defaultValue}
        />
      );
    };
  },
});

export default Switch;
