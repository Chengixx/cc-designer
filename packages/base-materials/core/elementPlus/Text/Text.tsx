import { useMergeAttr } from "@cgx-designer/hooks";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Text = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => (
      <span
        style={{
          fontSize: renderProps.size,
          color: renderProps.color,
        }}
      >
        {renderProps.label}
      </span>
    );
  },
});

export default Text;
