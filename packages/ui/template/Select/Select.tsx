
import { ElOption, ElSelect, ElSwitch } from "element-plus";
import { defineComponent } from "vue";
import { GroupOption } from ".";

const Select = defineComponent({
  props: {
    props: Object
  },
  setup(props) {
    return () => {
      return (
        <ElSelect
          v-model={props.props!.defaultValue}
          placeholder="请选择"
          multiple={props.props!.multiple}
        >
          {props.props!.options.map((option: GroupOption) => (
            <ElOption
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </ElSelect>
      )
    }
  }
})

export default Select