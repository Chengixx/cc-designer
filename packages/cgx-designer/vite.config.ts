import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: "../",
      outDir: "dist",
    }),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      "@cgx-designer/controller": path.resolve(__dirname, "../controller"),
      "@cgx-designer/materials": path.resolve(__dirname, "../materials"),
      "@cgx-designer/utils": path.resolve(__dirname, "../utils"),
      "@cgx-designer/hooks": path.resolve(__dirname, "../hooks"),
      "@cgx-designer/extensions": path.resolve(__dirname, "../extensions"),
      "@cgx-designer/designer": path.resolve(__dirname, "../designer"),
      "@cgx-designer/engine": path.resolve(__dirname, "../engine"),
      "@cgx-designer/renderer": path.resolve(__dirname, "../renderer"),
      "@cgx-designer/types": path.resolve(__dirname, "../types"),
    },
  },
  build: {
    outDir: "dist",
    commonjsOptions: {
      esmExternals: true,
    },
    lib: {
      name: "cgx-designer",
      entry: {
        index: path.resolve(__dirname, "./index.ts"),
        elementPlus: path.resolve(
          __dirname,
          "../materials/core/elementPlus/index.ts"
        ),
        vuetify: path.resolve(__dirname, "../materials/core/vuetify/index.ts"),
      },
      fileName: (ModuleFormat, entryName) => {
        console.log("文件名", ModuleFormat, entryName);
        const extension = ModuleFormat === "es" ? "js" : ModuleFormat;
        const isIndexEntry = entryName === "index";
        const path = isIndexEntry
          ? `index.${extension}`
          : `materials/core/${entryName}/index.${extension}`;
        return path;
      },
    },
    rollupOptions: {
      external: ["vue", "element-plus", "vuetify"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
