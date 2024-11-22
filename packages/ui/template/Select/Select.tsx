import { ElOption, ElSelect } from "element-plus";
import { defineComponent, PropType } from "vue";
import { IEditorElement } from "@cgx-designer/core";
import { GroupOption } from "../../types";

const Select = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      //向外抛出错误
      if (!!!props.elementSchema.props!.options) {
        console.warn("[warn]:选择器没有选项，请设置选项");
      }
      //保底机制 防止为空的时候直接报错
      const optionsList: GroupOption[] =
        props.elementSchema.props!.options ?? [];
      return (
        <ElSelect
          {...renderProps}
          //!重新渲染
          key={String(props.elementSchema.props!.multiple)}
        >
          {optionsList.map((option: GroupOption) => (
            <ElOption {...option} key={option.value} />
          ))}
        </ElSelect>
      );
    };
  },
});

export default Select;
