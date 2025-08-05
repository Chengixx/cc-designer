import * as monaco from "monaco-editor";

// 轻量级 Vue 语法高亮
export function registerVueLanguage() {
  // 检查是否已经注册
  if (monaco.languages.getLanguages().some((lang) => lang.id === "vue")) {
    return;
  }

  // 注册 Vue 语言
  monaco.languages.register({ id: "vue" });

  // 设置语言配置
  monaco.languages.setLanguageConfiguration("vue", {
    comments: {
      lineComment: "//",
      blockComment: ["<!--", "-->"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["<", ">"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*<!--\\s*#region\\b.*-->"),
        end: new RegExp("^\\s*<!--\\s*#endregion\\b.*-->"),
      },
    },
  });

  // 设置语法高亮规则
  monaco.languages.setMonarchTokensProvider("vue", {
    defaultToken: "",
    tokenPostfix: ".vue",

    // Vue 3 关键字
    keywords: [
      // Vue 3 Composition API
      "setup",
      "defineProps",
      "defineEmits",
      "defineExpose",
      "withDefaults",
      "ref",
      "reactive",
      "computed",
      "watch",
      "watchEffect",
      "watchPostEffect",
      "watchSyncEffect",
      "readonly",
      "shallowRef",
      "shallowReactive",
      "shallowReadonly",
      "toRef",
      "toRefs",
      "toRaw",
      "markRaw",
      "effectScope",
      "getCurrentScope",
      "onScopeDispose",
      "provide",
      "inject",
      "nextTick",
      "unref",
      "isRef",
      "isReactive",
      "isReadonly",
      "isProxy",
      "isShallow",
      "toValue",

      // Vue 3 生命周期钩子
      "onMounted",
      "onUpdated",
      "onUnmounted",
      "onBeforeMount",
      "onBeforeUpdate",
      "onBeforeUnmount",
      "onErrorCaptured",
      "onRenderTracked",
      "onRenderTriggered",
      "onActivated",
      "onDeactivated",
      "onServerPrefetch",

      // Vue 模板标签
      "template",
      "script",
      "style",

      // JavaScript 关键字
      "function",
      "var",
      "let",
      "const",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "default",
      "break",
      "continue",
      "return",
      "throw",
      "try",
      "catch",
      "finally",
      "import",
      "export",
      "default",
      "class",
      "extends",
      "super",
      "new",
      "this",
      "static",
      "async",
      "await",
      "yield",
      "of",
      "in",
      "instanceof",
      "typeof",
      "void",
      "delete",
      "with",
      "debugger",
      "enum",
      "interface",
      "type",
      "namespace",
      "module",
      "declare",
      "abstract",
      "implements",
      "public",
      "private",
      "protected",
      "readonly",
      "override",
      "satisfies",
      "keyof",
      "typeof",
      "infer",
      "extends",
      "as",
      "is",
      "any",
      "unknown",
      "never",
      "void",
      "null",
      "undefined",
      "true",
      "false",
    ],

    // Vue 指令
    vueDirectives: [
      "v-if",
      "v-else",
      "v-else-if",
      "v-show",
      "v-for",
      "v-on",
      "v-bind",
      "v-model",
      "v-slot",
      "v-pre",
      "v-cloak",
      "v-once",
      "v-memo",
      "v-is",
      "v-text",
      "v-html",
      "v-ref",
      "v-bind:class",
      "v-bind:style",
      "v-bind:key",
      "v-bind:ref",
      "v-bind:is",
      "v-on:click",
      "v-on:input",
      "v-on:change",
      "v-on:submit",
      "v-on:keyup",
      "v-on:keydown",
      "v-on:keypress",
      "v-on:focus",
      "v-on:blur",
      "v-on:mouseenter",
      "v-on:mouseleave",
      "v-on:mouseover",
      "v-on:mouseout",
      "v-on:mousedown",
      "v-on:mouseup",
      "v-on:scroll",
      "v-on:resize",
      "v-on:load",
      "v-on:error",
    ],

    // Vue 事件修饰符
    eventModifiers: [
      "stop",
      "prevent",
      "capture",
      "self",
      "once",
      "passive",
      "native",
      "left",
      "right",
      "middle",
      "enter",
      "tab",
      "delete",
      "esc",
      "space",
      "up",
      "down",
      "left",
      "right",
      "ctrl",
      "alt",
      "shift",
      "meta",
      "exact",
    ],

    operators: [
      "=",
      ">",
      "<",
      "!",
      "~",
      "?",
      ":",
      "==",
      "<=",
      ">=",
      "!=",
      "<>",
      "&&",
      "||",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "&",
      "|",
      "^",
      "%",
      "<<",
      ">>",
      ">>>",
      "+=",
      "-=",
      "*=",
      "/=",
      "&=",
      "|=",
      "^=",
      "%=",
      "<<=",
      ">>=",
      ">>>=",
      "=>",
      "?.",
      "??",
      "||=",
      "&&=",
      "??=",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    tokenizer: {
      root: [
        // Vue 模板标签
        [/<template>/, "keyword"],
        [/<\/template>/, "keyword"],
        [/<script>/, "keyword"],
        [/<\/script>/, "keyword"],
        [/<style>/, "keyword"],
        [/<\/style>/, "keyword"],

        // Vue 指令 (完整匹配)
        [
          /v-[a-zA-Z-]+(?:\.[a-zA-Z-]+)*/,
          {
            cases: {
              "@vueDirectives": "keyword",
              "@default": "keyword",
            },
          },
        ],

        // Vue 事件修饰符
        [
          /\.(stop|prevent|capture|self|once|passive|native|left|right|middle|enter|tab|delete|esc|space|up|down|ctrl|alt|shift|meta|exact)/,
          "keyword",
        ],

        // Vue 绑定简写
        [/@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*/, "keyword"],
        [/:[a-zA-Z-]+/, "keyword"],

        // Vue 插值语法
        [/\{\{[^}]*\}\}/, "string"],

        // HTML 标签
        [/<[^>]+>/, "tag"],

        // 字符串
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],
        [/`/, "string", "@string_backtick"],

        // 数字
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/0[xX][0-9a-fA-F]+/, "number.hex"],
        [/0[bB][01]+/, "number.binary"],
        [/0[oO][0-7]+/, "number.octal"],
        [/\d+/, "number"],

        // 注释
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],
        [/<!--.*?-->/, "comment"],

        // 标识符和关键字
        [
          /[a-zA-Z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],

        // 分隔符
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, "operator"],
        [/[;,.]/, "delimiter"],

        // 空白字符
        [/\s+/, "white"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/"/, "string", "@pop"],
      ],

      string_single: [
        [/[^\\']+/, "string"],
        [/'/, "string", "@pop"],
      ],

      string_backtick: [
        [/[^\\`]+/, "string"],
        [/`/, "string", "@pop"],
      ],

      comment: [
        [/[^*/]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/./, "comment"],
      ],
    },
  });

  // 注册 Vue 语言特性
  monaco.languages.registerCompletionItemProvider("vue", {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        // Vue 3 Composition API
        {
          label: "ref",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "ref(${1:initialValue})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Creates a reactive reference",
          range: range,
        },
        {
          label: "reactive",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "reactive(${1:object})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Creates a reactive object",
          range: range,
        },
        {
          label: "computed",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "computed(() => {\n\t${1:// computed logic}\n})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Creates a computed property",
          range: range,
        },
        {
          label: "watch",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText:
            "watch(${1:source}, (${2:newValue}, ${3:oldValue}) => {\n\t${4:// watch logic}\n})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Watches a reactive source",
          range: range,
        },
        {
          label: "onMounted",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "onMounted(() => {\n\t${1:// mounted logic}\n})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Lifecycle hook - called when component is mounted",
          range: range,
        },
        {
          label: "defineProps",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "defineProps<{\n\t${1:propName}: ${2:string}\n}>()",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Define component props",
          range: range,
        },
        {
          label: "defineEmits",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "defineEmits<{\n\t${1:eventName}: [${2:payload}]\n}>()",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Define component emits",
          range: range,
        },

        // Vue 指令
        {
          label: "v-if",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'v-if="${1:condition}"',
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Conditionally render element",
          range: range,
        },
        {
          label: "v-for",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText:
            'v-for="(${1:item}, ${2:index}) in ${3:items}" :key="${4:item.id}"',
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Render list of items",
          range: range,
        },
        {
          label: "v-model",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'v-model="${1:variable}"',
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Two-way data binding",
          range: range,
        },
        {
          label: "@click",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: '@click="${1:handleClick}"',
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Click event handler",
          range: range,
        },
      ];

      return { suggestions };
    },
  });
}
