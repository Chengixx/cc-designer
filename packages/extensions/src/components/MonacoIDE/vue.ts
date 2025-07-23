import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor";
import { createHighlighter } from "shiki";
import themeDark from "shiki/themes/dark-plus.mjs";
import themeLight from "shiki/themes/light-plus.mjs";

const highlighter = await createHighlighter({
  themes: [themeDark, themeLight, "vitesse-dark", "vitesse-light"],
  langs: ["javascript", "typescript", "vue"],
});

monaco.languages.register({ id: "vue" });
monaco.languages.register({ id: "typescript" });
monaco.languages.register({ id: "javascript" });

shikiToMonaco(highlighter, monaco);
