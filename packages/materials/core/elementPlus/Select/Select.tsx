import { ElOption, ElSelect } from "element-plus";
import { defineComponent, PropType } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { GroupOption } from "../../../types";
import { useMergeAttr } from "@cgx-designer/hooks";

const Select = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      //向外抛出错误
      if (!!!renderProps.options) {
        console.warn("[warn]:选择器没有选项，请设置选项");
      }
      //保底机制 防止为空的时候直接报错
      const optionsList: GroupOption[] =
        renderProps.options ?? [];
      return (
        <ElSelect
          {...renderProps}
          //!重新渲染
          key={String(renderProps.multiple)}
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
