import { defineComponent, inject, nextTick, onMounted, ref, watch } from "vue";
import * as monaco from "monaco-editor";
import { ThemeManage } from "@cgx-designer/hooks";

const MonacoIDE = defineComponent({
  name: "MonacoIDE",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "vs-light",
    },
    mode: {
      type: String,
      default: "javascript",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, expose }) {
    const themeManager = inject("themeManager") as ThemeManage;
    let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
    const monacoRef = ref<HTMLDivElement | null>(null);
    const isInternalUpdate = ref(false);
    const lastEditorValue = ref("");

    const getValue = () => props.modelValue ?? "";

    const format = () => {
      try {
        if (monacoEditor) {
          monacoEditor.getAction("editor.action.formatDocument")?.run();
        }
      } catch (error) {
        console.warn(
          "cgx-designer: Monaco格式化失败，如需此功能请下载vite插件",
          error
        );
      }
    };

    // 安全地更新编辑器内容，保持光标位置
    const safeSetValue = (value: string) => {
      if (!monacoEditor) return;

      const currentValue = monacoEditor.getValue();
      const currentPosition = monacoEditor.getPosition();

      // 如果内容相同，不需要更新
      if (currentValue === value) return;

      // 记录当前光标位置
      const selection = monacoEditor.getSelection();

      // 更新内容
      monacoEditor.setValue(value);

      // 尝试恢复光标位置（如果新内容长度足够）
      if (currentPosition && value.length > 0) {
        const newPosition = {
          lineNumber: Math.min(
            currentPosition.lineNumber,
            monacoEditor.getModel()?.getLineCount() || 1
          ),
          column: Math.min(currentPosition.column, value.length + 1),
        };
        monacoEditor.setPosition(newPosition);

        // 恢复选择范围
        if (selection) {
          try {
            monacoEditor.setSelection(selection);
          } catch (e) {
            // 如果选择范围无效，忽略错误
          }
        }
      }
    };

    watch(
      () => themeManager.isDark.value,
      () => {
        nextTick(() => {
          monaco.editor.setTheme(
            themeManager.isDark.value ? "vs-dark" : "vs-light"
          );
        });
      },
      {
        immediate: true,
      }
    );

    watch(
      () => props.modelValue,
      (newValue) => {
        // 如果是内部更新触发的，跳过
        if (isInternalUpdate.value) return;
        if (monacoEditor && monacoEditor.getValue() === newValue) return;

        nextTick(() => {
          safeSetValue(newValue ?? "");
          format();
        });
      },
      {
        immediate: true,
        deep: true,
      }
    );

    onMounted(() => {
      monacoEditor = monaco.editor.create(monacoRef.value as HTMLElement, {
        value: getValue(),
        language: props.mode,
        readOnly: props.readonly,
        theme: props.theme,
        automaticLayout: true,
      });

      monacoEditor.onDidChangeModelContent(() => {
        const currentValue = monacoEditor?.getValue() ?? "";
        if (currentValue === lastEditorValue.value) return;
        lastEditorValue.value = currentValue;
        isInternalUpdate.value = true;
        emit("update:modelValue", currentValue);
        nextTick(() => {
          isInternalUpdate.value = false;
        });
      });

      nextTick(() => {
        format();
      });
    });

    expose({
      getValue,
      setValue: safeSetValue,
      format,
    });

    return () => <div ref={monacoRef} class="c-min-h-40 c-w-full c-h-full" />;
  },
});

export default MonacoIDE;

export * from "./util";
export * from "./vue-highlight";