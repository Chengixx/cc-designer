import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { visualizer } from "rollup-plugin-visualizer";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: "../",
      outDir: "dist",
    }),
    cssInjectedByJsPlugin(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "test.html",
      open: true,
    }),
    terser(),
  ],
  resolve: {
    alias: {
      "@cgx-designer/controller": path.resolve(__dirname, "../controller"),
      "@cgx-designer/base-materials": path.resolve(
        __dirname,
        "../base-materials"
      ),
      "@cgx-designer/utils": path.resolve(__dirname, "../utils"),
      "@cgx-designer/hooks": path.resolve(__dirname, "../hooks"),
      "@cgx-designer/extensions": path.resolve(__dirname, "../extensions"),
      "@cgx-designer/element-designer": path.resolve(
        __dirname,
        "../element-designer"
      ),
      "@cgx-designer/element-engine": path.resolve(
        __dirname,
        "../element-engine"
      ),
      "@cgx-designer/element-renderer": path.resolve(
        __dirname,
        "../element-renderer"
      ),
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
          "../base-materials/core/elementPlus/index.ts"
        ),
        vuetify: path.resolve(
          __dirname,
          "../base-materials/core/vuetify/index.ts"
        ),
      },
      fileName: (ModuleFormat, entryName) => {
        console.log("文件名", ModuleFormat, entryName);
        const extension = ModuleFormat === "es" ? "js" : ModuleFormat;
        const isIndexEntry = entryName === "index";
        const path = isIndexEntry
          ? `index.${extension}`
          : `base-materials/core/${entryName}/index.${extension}`;
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
