import { ElDivider } from "element-plus";
import { defineComponent } from "vue";

const Divider = defineComponent({
  props: {
    props: Object
  },
  setup(props: any) {
    return () => {
      return (
        <ElDivider>
          {props.props.placeHolder}
        </ElDivider>
      )
    }
  }
})

export default Divider;