import { VSelect } from "vuetify/components";
import { defineComponent, PropType } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { GroupOption } from "../../../types";

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
        <VSelect
          {...renderProps}
          itemTitle="label"
          itemValue="value"
          items={optionsList}
        />
      );
    };
  },
});

export default Select;
