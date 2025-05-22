import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { ElSwitch } from "element-plus";
import { isEmpty } from "lodash-es";
import { defineComponent, PropType } from "vue";

const Switch = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return <ElSwitch {...renderProps} />;
    };
  },
});

export default Switch;
