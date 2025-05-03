import { IEditorElement } from "@cgx-designer/types";
import { defineComponent, PropType } from "vue";

const Title = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <h1
          style={{
            fontSize: props.elementSchema.props!.size,
            color: props.elementSchema.props!.color,
          }}
        >
          {props.elementSchema.props!.label}
        </h1>
      );
    };
  },
});

export default Title;
