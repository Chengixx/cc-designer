import { ElButton } from "element-plus";
import { defineComponent } from "vue";

const Button = defineComponent({
  props: {
    props: Object
  },
  setup(props: any) {
    return () => {
      return (
        <ElButton size={props.props!.size} type={props.props!.type}>
          {props.props!.label}
        </ElButton>
      )
    }
  }
})

export default Button;