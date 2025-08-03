import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VueDevTools from "vite-plugin-vue-devtools";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
  //改一个端口
  server: {
    port: 3378,
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[name]",
    }),
    monacoEditorPlugin({
      languageWorkers: ["editorWorkerService", "json", "typescript"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
