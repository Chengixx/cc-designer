import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { defineComponent, PropType } from "vue";

const Title = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <h1
          style={{
            fontSize: renderProps.size,
            color: renderProps.color,
          }}
        >
          {renderProps.label}
        </h1>
      );
    };
  },
});

export default Title;
