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
      default: "twilight",
    },
    mode: {
      type: String,
      default: "javascript",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, expose }) {
    const themeManage = inject("themeManage") as ThemeManage;
    let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
    const monacoRef = ref<HTMLDivElement | null>(null);
    const setValue = (v: string) => monacoEditor?.setValue(v || "");
    const getValue = () => props.modelValue ?? "";

    const format = () => {
      if (monacoEditor) {
        monacoEditor.getAction("editor.action.formatDocument")?.run();
      }
    };

    watch(
      () => themeManage.isDark.value,
      () => {
        nextTick(() => {
          monaco.editor.setTheme(
            themeManage.isDark.value ? "dark-plus" : "light-plus"
          );
        });
      },
      {
        immediate: true,
      }
    );

    watch(
      () => props.modelValue,
      () => {
        nextTick(() => {
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

      monacoEditor.onDidChangeModelContent(() =>
        emit("update:modelValue", monacoEditor?.getValue() ?? "")
      );
      nextTick(() => {
        format();
      });
    });

    expose({
      getValue,
      setValue,
      format,
    });

    return () => <div ref={monacoRef} class="c-min-h-40 c-w-full c-h-full" />;
  },
});

export default MonacoIDE;

export * from "./util";
