import { computed, defineComponent, PropType } from "vue";

const CCard = defineComponent({
  props: {
    shadow: {
      type: String as PropType<"hover" | "always" | "never">,
      default: "hover",
      required: false,
    },
  },
  setup(props, { slots }) {
    const { shadow } = props;

    const shadowClass = computed(() => {
      if (shadow === "hover") {
        return "hover:c-shadow-[0px_0px_12px_rgba(0,0,0,.12)] c-transition-all";
      }
      if (shadow === "always") {
        return "c-shadow-[0px_0px_12px_rgba(0,0,0,.12)]";
      }
    });

    return () => (
      <div
        class={[
          "c-w-full c-border c-border-gray-200 c-rounded-md c-mt-2",
          shadowClass.value,
        ]}
      >
        {slots.header && (
          <div class="c-font-medium c-text-sm c-text-gray-600 c-border-b c-border-gray-200 c-flex c-items-center c-p-2">
            {slots.header()}
          </div>
        )}
        <div class="c-p-4">{slots.default && slots.default()}</div>
        {slots.footer && (
          <div class="c-font-medium c-text-sm c-text-gray-600 c-border-t c-border-gray-200 c-flex c-items-center c-p-2">
            {slots.footer()}
          </div>
        )}
      </div>
    );
  },
});

export default CCard;
