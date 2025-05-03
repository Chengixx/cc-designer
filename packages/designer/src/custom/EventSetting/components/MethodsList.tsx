import { Empty } from "@cgx-designer/extensions";
import { GroupOption } from "@cgx-designer/materials";
import { defineComponent, PropType } from "vue";

const MethodsList = defineComponent({
  props: {
    methodsList: {
      type: Array as PropType<any>,
    },
    currentMethod: {
      type: String,
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    return () => (
      <>
        {props.methodsList && props.methodsList.length ? (
          <>
            {props.methodsList.map((method: GroupOption) => {
              return (
                <div
                  key={method.value}
                  class={[
                    "c-p-1 c-border c-rounded-md c-cursor-pointer c-flex c-justify-center c-items-center c-my-1",
                    props.currentMethod === method.value &&
                      "c-border-blue-500 dark:c-border-blue-500",
                    props.currentMethod !== method.value &&
                      "dark:c-border-darkMode",
                  ]}
                  onClick={() => emit("select", method.value)}
                >
                  <span>{method.label}</span>
                </div>
              );
            })}
          </>
        ) : (
          <Empty />
        )}
      </>
    );
  },
});

export default MethodsList;
