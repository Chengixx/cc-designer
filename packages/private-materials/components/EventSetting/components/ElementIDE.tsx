import { ElementEngine } from "@cgx-designer/element-engine";
import { IEditorElement } from "@cgx-designer/types";
import { computed, defineComponent, PropType } from "vue";
import { CFormItem } from "@cgx-designer/extensions";

const ElementIDE = defineComponent({
  props: {
    modelValue: {
      type: [Object, String] as PropType<any>,
    },
    actionArgsConfigs: {
      type: Object as PropType<IEditorElement[]>,
      required: true,
    },
  },
  emits: ["updateModelValue"],
  setup(props, { emit }) {
    const valueRef = computed<any>(() => {
      if (props.modelValue) {
        return JSON.parse(props.modelValue);
      }
      return [];
    });

    const handleSetValue = (value: any, field: string) => {
      const values = [...JSON.parse(props.modelValue ?? "[]")] as Record<
        string,
        any
      >;

      values[field] = value;
      emit("updateModelValue", JSON.stringify(values));
      // 将修改过的组件属性推入撤销操作的栈中
    };
    return () => (
      <div>
        {props.actionArgsConfigs.map((item) => {
          return (
            <div key={item.id}>
              <CFormItem
                label={!!item.props!.label ? item.props!.label : item.key}
              >
                <ElementEngine
                  elementSchema={{
                    ...item,
                    formItem: false,
                  }}
                  modelValue={valueRef.value[item.field!]}
                  onUpdate:modelValue={($event) =>
                    handleSetValue($event, item.field!)
                  }
                />
              </CFormItem>
            </div>
          );
        })}
      </div>
    );
  },
});

export default ElementIDE;
