import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import ace from "ace-builds";
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";
import { js_beautify } from "js-beautify";
import { ElButton, ElIcon, ElTooltip } from "element-plus";
import { Star } from "@element-plus/icons-vue";

import "ace-builds/src-min-noconflict/theme-monokai"; // 默认设置的主题
import "ace-builds/src-min-noconflict/theme-dracula"; // 默认设置的主题
import "ace-builds/src-min-noconflict/theme-sqlserver"; // 新设主题
import "ace-builds/src-min-noconflict/theme-twilight"; // twilight 主题
import "ace-builds/src-min-noconflict/mode-javascript"; // 默认设置的语言模式
import "ace-builds/src-min-noconflict/mode-json"; //
import "ace-builds/src-min-noconflict/mode-css"; //
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/css";
import { ThemeManage } from "@cgx-designer/hooks/src/useTheme";

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
  },
  emits: ["update:modelValue"],
  setup(props, { emit, expose }) {
    const themeManage = inject("themeManage") as ThemeManage;
    const aceRef = ref<HTMLElement | null>(null);
    const aceEditor = ref<ace.Ace.Editor | null>(null);
    ace.config.setModuleUrl("ace/mode/javascript_worker", workerJavascriptUrl);
    const initEditor = () => {
      aceEditor.value = ace.edit(aceRef.value as HTMLElement, {
        // maxLines: 20, // 最大行数，超过会自动出现滚动条
        // minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 13, // 编辑器内字体大小
        theme: themeManage.isDark.value
          ? "ace/theme/twilight"
          : "ace/theme/sqlserver", // 默认设置的主题
        mode: "ace/mode/javascript", // 默认设置的语言模式
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
      if (aceEditor.value) {
        const formattedCode = js_beautify(aceEditor.value.getValue(), {
          indent_size: 2,
          space_in_empty_paren: true,
        });
        aceEditor.value.setValue(formattedCode, -1);
      }
    };
    const setEditorValue = (value: string) => {
      if (aceEditor.value) {
        const cursorPos = aceEditor.value.getCursorPosition();
        aceEditor.value.setValue(value, -1);
        formatCode();
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

    expose({
      setEditorValue,
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
      return (
        <div class="h-full relative">
          <div ref={aceRef} class="h-full" />
          <div class="absolute right-[8px] bottom-[8px]">
            <ElTooltip content="格式化" effect="light" placement="top">
              <ElButton onClick={formatCode} circle>
                <ElIcon>
                  <Star />
                </ElIcon>
              </ElButton>
            </ElTooltip>
          </div>
        </div>
      );
    };
  },
});
export default IDE;
