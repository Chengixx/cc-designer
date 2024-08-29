import { ElInput } from "element-plus";
import { defineComponent } from "vue";

const Input = defineComponent({
  props: {
    props: Object
  },
  setup(props: any) {
    return () => {
      return (
        <ElInput
          placeholder={props.props!.placeHolder}
          size={props.props!.size}
          v-model={props.props!.defaultValue}
        ></ElInput>
      )
    }
  }
})

export default Input