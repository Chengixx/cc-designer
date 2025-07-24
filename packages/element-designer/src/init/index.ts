import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor";
import { createHighlighter } from "shiki";
import themeDark from "shiki/themes/dark-plus.mjs";
import themeLight from "shiki/themes/light-plus.mjs";

export const initMonacoVue = async () => {
  const highlighter = await createHighlighter({
    themes: [themeDark, themeLight, "vitesse-dark", "vitesse-light"],
    langs: ["javascript", "typescript", "vue", "json", "css", "html"],
  });

  monaco.languages.register({ id: "vue" });
  monaco.languages.register({ id: "typescript" });
  monaco.languages.register({ id: "javascript" });
  monaco.languages.register({ id: "json" });
  monaco.languages.register({ id: "css" });
  monaco.languages.register({ id: "html" });

  shikiToMonaco(highlighter, monaco);
};
