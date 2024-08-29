
import { ElSwitch } from "element-plus";
import { defineComponent } from "vue";

const Switch = defineComponent({
  props: {
    props: Object
  },
  setup(props) {
    return () => {
      return (
        <ElSwitch size={props.props!.size} v-model={props.props!.defaultValue} />
      )
    }
  }
})

export default Switch