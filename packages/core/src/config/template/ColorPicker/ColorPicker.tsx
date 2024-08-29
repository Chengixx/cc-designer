import { ElColorPicker } from "element-plus";
import { defineComponent } from "vue";

const ColorPicker = defineComponent({
  props: {
    props: Object
  },
  setup(props: any) {
    return () => {
      return (
        <ElColorPicker size={props.props.size} v-model={props.props.defaultValue} />
      )
    }
  }
})

export default ColorPicker;