import { GroupOption } from "@cgx-designer/ui";
import { ElEmpty } from "element-plus";
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
                    "p-1 border rounded-md cursor-pointer flex justify-center items-center my-1",
                    props.currentMethod === method.value &&
                      "border-blue-500 dark:border-blue-500",
                    props.currentMethod !== method.value &&
                      "dark:border-darkMode",
                  ]}
                  onClick={() => emit("select", method.value)}
                >
                  <span>{method.label}</span>
                </div>
              );
            })}
          </>
        ) : (
          <ElEmpty description="暂无可选事件" imageSize={64} />
        )}
      </>
    );
  },
});

export default MethodsList;
