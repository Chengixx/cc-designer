import { defineComponent } from "vue";

const Text = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props) {
    return () => {
      return (
        <div
          class="h-fit w-fit"
          style={{
            fontSize: props.elementSchema!.props!.size,
            color: props.elementSchema!.props!.color,
          }}
        >
          {props.elementSchema!.props!.label}
        </div>
      );
    };
  },
});

export default Text;
