import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { defineComponent, PropType } from "vue";

const Text = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <span
          style={{
            fontSize: renderProps.size,
            color: renderProps.color,
          }}
        >
          {renderProps.label}
        </span>
      );
    };
  },
});

export default Text;
