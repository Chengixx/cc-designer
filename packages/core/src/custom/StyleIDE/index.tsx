import { ElButton, ElTooltip } from "element-plus";
import IDE from "../../components/IDE/index";
import { defineComponent, ref, watch } from "vue";
import { CssIcon } from "@cgx-designer/icons";
import { Message } from "@cgx-designer/extensions";

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
        styleIDERef.value?.formatCode();
        const target = JSON.parse(bindValue.value!);
        emit("update:modelValue", target);
        Message.success("保存成功");
      } catch (error) {
        Message.error(`保存失败:${error}`);
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
        <div class="c-flex c-items-center c-h-10 c-justify-between c-px-2">
          <div class="c-flex c-items-center">
            <ElTooltip
              effect="dark"
              content={`编写的代码必须为JSX的style样式写法\n请在编写完成后进行保存`}
              placement="top"
            >
              <CssIcon class="c-fill-blue-500 c-w-5 c-h-5" />
            </ElTooltip>
            <span class="c-font-medium c-text-sm c-text-gray-600 dark:c-text-gray-300">
              样式
            </span>
          </div>
          <ElButton link type="primary" onClick={handleSave}>
            保存
          </ElButton>
        </div>
        <div class="c-w-full c-h-40 c-border-2 c-transition-all c-duration-300 hover:c-border-blue-500 dark:c-border-gray-600 dark:hover:c-border-blue-500 border-solid rounded-md overflow-hidden">
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
