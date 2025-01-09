import { defineComponent } from "vue";

const Divider = defineComponent({
  name: "Divider",
  props: {
    label: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    return () => (
      <div class="c-border-t c-border-[#dcdfe6] c-my-6">
        {props.label && (
          <div class="c-bg-white dark:c-bg-[#141414] c-px-5 c-absolute c-left-1/2 c-transform c--translate-x-1/2 c--translate-y-1/2 c-text-center  c-text-sm">
            {props.label}
          </div>
        )}
      </div>
    );
  },
});

export default Divider;
