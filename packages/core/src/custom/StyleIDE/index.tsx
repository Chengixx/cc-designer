import { ElButton } from "element-plus";
import IDE from "../../components/IDE/index";
import { defineComponent, ref, watch } from "vue";

const StyleIDE = defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(_, { attrs, emit }) {
    const styleIDERef = ref<typeof IDE | null>(null);
    const bindValue = ref<string | null>(null);
    const handleSave = () => {
      const target = JSON.parse(bindValue.value!);
      emit("update:modelValue", target);
    };
    watch(
      () => attrs.modelValue,
      (nv) => {
        if (!nv) return;
        console.log(nv, 6666);
        bindValue.value = JSON.stringify(nv);
        styleIDERef.value?.setEditorValue(bindValue.value);
      },
      { immediate: true, deep: true }
    );
    return () => (
      <>
        <div class="font-medium text-sm text-gray-600 flex items-center h-10 dark:text-gray-300 justify-between px-2">
          <span>CSS样式</span>
          <ElButton link type="primary" onClick={handleSave}>
            保存
          </ElButton>
        </div>
        <div class="w-full h-40 border">
          <IDE
            ref={styleIDERef}
            v-model={bindValue.value}
            showFormatButton={false}
          />
        </div>
      </>
    );
  },
});

export default StyleIDE;
