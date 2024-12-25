import { ElButton, ElMessage, ElTooltip } from "element-plus";
import IDE from "../../components/IDE/index";
import { defineComponent, ref, watch } from "vue";
import { CssIcon } from "@cgx-designer/icons";

const StyleIDE = defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(_, { attrs, emit }) {
    const styleIDERef = ref<typeof IDE | null>(null);
    const bindValue = ref<string | null>(null);
    const handleSave = () => {
      //保底机制
      if (!bindValue.value) {
        bindValue.value = JSON.stringify({});
      }
      try {
        const target = JSON.parse(bindValue.value!);
        emit("update:modelValue", target);
        ElMessage.success("保存成功");
      } catch (error) {
        ElMessage.error(`保存失败:${error}`);
      }
    };
    watch(
      () => attrs.modelValue,
      (nv) => {
        if (!nv) return;
        bindValue.value = JSON.stringify(nv);
        styleIDERef.value?.setEditorValue(bindValue.value);
      },
      { immediate: true, deep: true }
    );
    return () => (
      <>
        <div class="flex items-center h-10 justify-between px-2">
          <div class="flex items-center">
            <ElTooltip
              effect="dark"
              content={`编写的代码必须为JSX的style样式写法\n请在编写完成后进行保存`}
              placement="top"
            >
              <CssIcon class="fill-blue-500 w-5 h-5" />
            </ElTooltip>
            <span class="font-medium text-sm text-gray-600 dark:text-gray-300">
              样式
            </span>
          </div>
          <ElButton link type="primary" onClick={handleSave}>
            保存
          </ElButton>
        </div>
        <div class="w-full h-40 border-2 transition-all duration-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 border-solid rounded-md overflow-hidden">
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
