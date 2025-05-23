import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import ace from "ace-builds";
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";
import workerHtmlUrl from "ace-builds/src-noconflict/worker-html?url";
import { js_beautify, html_beautify } from "js-beautify";
import { FormatIcon } from "@cgx-designer/icons";
import { ThemeManage } from "@cgx-designer/hooks/src/useTheme";

import "ace-builds/src-min-noconflict/theme-monokai"; // 默认设置的主题
import "ace-builds/src-min-noconflict/theme-dracula"; // 默认设置的主题
import "ace-builds/src-min-noconflict/theme-sqlserver"; // 新设主题
import "ace-builds/src-min-noconflict/theme-twilight"; // twilight 主题
import "ace-builds/src-min-noconflict/mode-javascript"; // 默认设置的语言模式
import "ace-builds/src-min-noconflict/mode-html"; // 默认设置的语言模式
import "ace-builds/src-min-noconflict/mode-json"; //
import "ace-builds/src-min-noconflict/mode-css"; //
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/css";
import { elementController } from "@cgx-designer/controller";

const IDE = defineComponent({
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
    showFormatButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, expose }) {
    const Button = elementController.getElementRender("button");
    const themeManage = inject("themeManage") as ThemeManage;
    const aceRef = ref<HTMLElement | null>(null);
    const aceEditor = ref<ace.Ace.Editor | null>(null);
    ace.config.setModuleUrl(
      `ace/mode/${props.mode}_worker`,
      props.mode === "html" ? workerHtmlUrl : workerJavascriptUrl
    );
    const initEditor = () => {
      aceEditor.value = ace.edit(aceRef.value as HTMLElement, {
        // maxLines: 20, // 最大行数，超过会自动出现滚动条
        // minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 13, // 编辑器内字体大小
        theme: themeManage.isDark.value
          ? "ace/theme/twilight"
          : "ace/theme/sqlserver", // 默认设置的主题
        mode: `ace/mode/${props.mode}`, // 默认设置的语言模式
        tabSize: 2, // 制表符设置为2个空格大小
        readOnly: props.readonly,
        highlightActiveLine: true,
        value: props.modelValue,
      });
      aceEditor.value.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true, // 启用实时自动完成
      });
      aceEditor.value.getSession().on("change", () => {
        emit("update:modelValue", aceEditor.value!.getValue());
      });
    };
    const formatCode = () => {
      //Todo 因为html格式化有问题
      if (aceEditor.value) {
        const editorValue: string = aceEditor.value.getValue();
        let formattedCode: string = "";
        if (props.mode === "javascript") {
          formattedCode = js_beautify(editorValue, {
            indent_size: 2,
            space_in_empty_paren: true,
          });
        }
        if (props.mode === "html") {
          formattedCode = html_beautify(editorValue, {
            indent_size: 2,
            preserve_newlines: true,
            max_preserve_newlines: 1,
          });
        }

        aceEditor.value.setValue(formattedCode, -1);
      }
    };
    const setEditorValue = (value: string, noFormat = false) => {
      if (aceEditor.value) {
        const cursorPos = aceEditor.value.getCursorPosition();
        aceEditor.value.setValue(value, -1);
        if (!noFormat) {
          formatCode();
        }
        aceEditor.value.moveCursorTo(cursorPos.row, cursorPos.column);
      }
    };

    const setEditorTheme = (theme: string) => {
      if (aceEditor.value) {
        aceEditor.value!.setTheme(theme);
      }
    };

    watch(
      () => themeManage.isDark.value,
      () => {
        if (themeManage.isDark.value) {
          setEditorTheme("ace/theme/twilight");
        } else {
          setEditorTheme("ace/theme/sqlserver");
        }
      }
    );

    watch(
      () => props.modelValue,
      () => {
        setEditorValue(props.modelValue, true);
      }
    );

    expose({
      setEditorValue,
      formatCode,
    });
    onMounted(() => {
      initEditor();
      formatCode();
    });
    onUnmounted(() => {
      if (aceEditor.value) {
        aceEditor.value.destroy();
        aceEditor.value = null;
      }
    });
    return () => {
      const renderProps = {
        icon:
          elementController.getCurrentElementLibraryName() !== "vuetify" &&
          FormatIcon,
        variant: "outlined",
        onClick: formatCode,
      };
      return (
        <div class="c-h-full c-relative">
          <div ref={aceRef} class="c-h-full" />
          {props.showFormatButton && (
            <div class="c-absolute c-right-[8px] c-bottom-[8px]">
              <Button {...renderProps}>
                {{
                  prepend: () => {
                    return <FormatIcon class="c-h-4 c-w-4 dark:c-fill-white" />;
                  },
                  default: () => {
                    return "格式化";
                  },
                }}
              </Button>
            </div>
          )}
        </div>
      );
    };
  },
});
export default IDE;
