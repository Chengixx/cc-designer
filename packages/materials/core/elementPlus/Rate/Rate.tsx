import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { ElRate } from "element-plus";
import { defineComponent, PropType } from "vue";

const Rate = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return <ElRate {...renderProps}></ElRate>;
    };
  },
});

export default Rate;
