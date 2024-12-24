import { ElButton } from "element-plus";
import IDE from "../../components/IDE/index";
import { defineComponent, ref, watch } from "vue";

const StyleIDE = defineComponent({
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    const styleIDERef = ref<typeof IDE | null>(null);
    const bindValue = ref<string | null>(null);
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
          <ElButton link type="primary">
            保存
          </ElButton>
        </div>
        <div class="w-full h-40">
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
