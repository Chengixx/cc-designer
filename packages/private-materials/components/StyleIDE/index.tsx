import { formatJson, MonacoIDE } from "@cgx-designer/extensions";
import { defineComponent, ref, watch } from "vue";
import { CssIcon } from "@cgx-designer/icons";
import { Message } from "@cgx-designer/extensions";
import { elementController } from "@cgx-designer/controller";
import { VBtnColorType } from "@cgx-designer/base-materials";
import { javaScript } from "./../../../../play/src/data";

const StyleIDE = defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(_, { attrs, emit }) {
    const Button = elementController.getElementRender("button");
    const styleIDERef = ref<typeof MonacoIDE | null>(null);
    const bindValue = ref<string | null>(null);
    const handleSave = () => {
      //保底机制
      if (!bindValue.value) {
        bindValue.value = formatJson({});
      }
      try {
        styleIDERef.value?.format();
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
        bindValue.value = formatJson(nv);
        styleIDERef.value?.setValue(bindValue.value);
      },
      { immediate: true, deep: true }
    );
    return () => (
      <>
        <div class="c-flex c-items-center c-h-10 c-justify-between c-px-2">
          <div
            class="c-flex c-items-center"
            title={`编写的代码必须为JSX的style样式写法\n请在编写完成后进行保存`}
          >
            <div class="c-cursor-pointer">
              <CssIcon class="c-fill-blue-500 c-w-5 c-h-5" />
            </div>
            <span class="c-font-medium c-text-sm c-text-gray-600 dark:c-text-gray-300 c-select-none">
              样式
            </span>
          </div>
          <Button
            link
            variant="text"
            type="primary"
            color={VBtnColorType.primary}
            onClick={handleSave}
          >
            保存
          </Button>
        </div>
        <div class="c-w-full c-h-40 c-rounded-md c-border-2 c-transition-all c-duration-300 hover:c-border-blue-500 dark:c-border-gray-600 dark:hover:c-border-blue-500 border-solid rounded-md overflow-hidden">
          <MonacoIDE
            ref={styleIDERef as any}
            v-model={bindValue.value}
            mode="javaScript"
          />
        </div>
      </>
    );
  },
});

export default StyleIDE;
