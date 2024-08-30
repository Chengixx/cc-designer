import { ElInput } from "element-plus";
import { defineComponent } from "vue";

const Textarea = defineComponent({
  props: {
    props: Object
  },
  setup(props) {
    return () => {
      return (
        <ElInput
          type="textarea"
          placeholder={props.props!.placeHolder}
          size={props.props!.size}
          v-model={props.props!.defaultValue}
        />
      )
    }
  }
})

export default Textarea