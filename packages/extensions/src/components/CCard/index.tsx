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
        return "hover:shadow-[0px_0px_12px_rgba(0,0,0,.12)] transition-all";
      }
      if (shadow === "always") {
        return "shadow-[0px_0px_12px_rgba(0,0,0,.12)]";
      }
    });

    return () => (
      <div
        class={[
          "w-full border border-gray-200 rounded-md mt-2",
          shadowClass.value,
        ]}
      >
        {slots.header && (
          <div class="font-medium text-sm text-gray-600 border-b border-gray-200 flex items-center p-2">
            {slots.header()}
          </div>
        )}
        <div class="p-4">{slots.default && slots.default()}</div>
        {slots.footer && (
          <div class="font-medium text-sm text-gray-600 border-t border-gray-200 flex items-center p-2">
            {slots.footer()}
          </div>
        )}
      </div>
    );
  },
});

export default CCard;
