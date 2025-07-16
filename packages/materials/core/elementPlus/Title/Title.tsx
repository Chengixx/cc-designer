import { useMergeAttr } from "@cgx-designer/hooks";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Title = defineComponent({
  props: createElementProps(),
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
