import ElementNode from "../../../components/ElementNode/index";
import { ElCol, ElRow } from "element-plus";
import { IEditorElement } from "index";
import { computed, defineComponent, PropType } from "vue";

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
      const values = [...JSON.parse(props.modelValue ?? "[]")];

      //Todo 类型错误
      // @ts-ignore
      values[field] = value;
      emit("updateModelValue", JSON.stringify(values));
      // 将修改过的组件属性推入撤销操作的栈中
    };
    return () => (
      <div>
        {props.actionArgsConfigs.map((item) => {
          return (
            <div key={item.key + item.field}>
              <ElRow class="w-full">
                <ElCol span={6}>
                  <div class="font-medium text-sm text-gray-600 h-full flex items-center dark:text-gray-300">
                    {!!item.props!.label ? item.props!.label : item.key}
                  </div>
                </ElCol>
                <ElCol span={18}>
                  <ElementNode
                    elementSchema={{
                      ...item,
                      formItem: false,
                    }}
                    provideValue={valueRef.value[item.field!]}
                    onUpdateProvideValue={($event) =>
                      handleSetValue($event, item.field!)
                    }
                  />
                </ElCol>
              </ElRow>
            </div>
          );
        })}
      </div>
    );
  },
});

export default ElementIDE;
