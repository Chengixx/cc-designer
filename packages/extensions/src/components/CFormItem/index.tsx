import { defineComponent } from "vue";

const CFormItem = defineComponent({
  props: {
    label: {
      type: String,
      required: false,
    },
    labelCol: {
      type: Number,
      default: 6,
    },
    needBottom: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const totalCol = 24;
    const { labelCol, needBottom } = props;
    const labelWidth = `${(labelCol / totalCol) * 100}%`;
    const contentWidth = `${((totalCol - labelCol) / totalCol) * 100}%`;

    return () => (
      <div
        class={[
          "c-w-full c-flex c-items-center",
          needBottom ? "c-mb-3" : "c-mb-0",
        ]}
      >
        <div class="c-w-full c-flex">
          {props.label && (
            <div style={{ width: labelWidth }}>
              <div class="c-font-medium c-text-sm c-text-gray-600 c-h-full c-flex c-items-center dark:c-text-gray-300">
                {props.label}
              </div>
            </div>
          )}
          <div style={{ width: props.label ? contentWidth : "100%" }}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    );
  },
});

export default CFormItem;
