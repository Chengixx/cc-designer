import { defineComponent } from "vue";

const Text = defineComponent({
  props: {
    props: Object
  },
  setup(props) {
    return () => {
      return (
        <div
          class="h-fit w-fit"
          style={{
            fontSize: props.props!.size,
            color: props.props!.color,
          }}
        >
          {props.props!.label}
        </div>
      )
    }
  }
})

export default Text