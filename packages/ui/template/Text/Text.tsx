import { IEditorElement } from "cgx-designer";
import { defineComponent, PropType } from "vue";

const Text = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <div
          class="h-fit w-fit"
          style={{
            fontSize: props.elementSchema.props.size,
            color: props.elementSchema.props.color,
          }}
        >
          {props.elementSchema.props.label}
        </div>
      );
    };
  },
});

export default Text;
