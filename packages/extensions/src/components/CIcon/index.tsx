import { defineComponent, PropType, ref } from "vue";
import { JSX } from "vue/jsx-runtime";

const CIcon = defineComponent({
  props: {
    icon: {
      type: Object as PropType<any>,
      required: true,
    },
    sizeClass: {
      type: String,
      default: "",
      require: false,
    },
    colorClass: {
      type: String,
      default: "",
      require: false,
    },
    extraClass: {
      type: String,
      default: "",
      require: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const IconRender = props.icon;

    return () => (
      <IconRender
        onClick={(e: Event) => {
          emit("click", e);
        }}
        class={[
          "c-cursor-pointer",
          props.extraClass,
          props.sizeClass ? props.sizeClass : "c-w-5 c-h-5",
          props.colorClass
            ? props.colorClass
            : "hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500",
        ]}
      />
    );
  },
});

export default CIcon;
