import { VSelect } from "vuetify/components";
import { defineComponent } from "vue";
import { GroupOption } from "../../../types";
import { createElementProps } from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const Select = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);
    return () => {
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
