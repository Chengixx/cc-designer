import { ElOption, ElSelect, ElSwitch } from "element-plus";
import { defineComponent, PropType } from "vue";
import { GroupOption } from ".";
import { IEditorElement } from "cgx-designer";

const Select = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props) {
    return () => {
      return (
        <ElSelect
          v-model={props.elementSchema!.props!.defaultValue}
          placeholder="请选择"
          multiple={props.elementSchema!.props!.multiple}
        >
          {props.elementSchema!.props!.options.map((option: GroupOption) => (
            <ElOption
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </ElSelect>
      );
    };
  },
});

export default Select;
