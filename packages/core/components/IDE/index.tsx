import { defineComponent, ref, watch } from "vue";
import BaseIDE from "./BaseIDE";
import { ElTabPane, ElTabs } from "element-plus";

const IDE = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "manba"
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const ideTheme = ref<string>("monokai")
    const BaseIDERef = ref<typeof BaseIDE | null>(null)
    const modelValue = ref<string>(props.modelValue)
    watch(modelValue, () => {
      emit('update:modelValue', modelValue.value)
    })
    const setModelValue = (value: string) => {
      modelValue.value = value
      BaseIDERef.value?.setEditorValue(value)
    }
    expose({
      setModelValue
    })
    return () => {
      return (
        <div>
          <ElTabs v-model={ideTheme.value} stretch type="border-card">
            <ElTabPane label="monokai" name={"monokai"} />
            <ElTabPane label="dracula" name={"dracula"} />
            <ElTabPane label="sqlserver" name={"sqlserver"} />
          </ElTabs>
          <BaseIDE ref={BaseIDERef} theme={ideTheme.value} v-model={modelValue.value} />
        </div>
      );
    };
  },
});
export default IDE;
