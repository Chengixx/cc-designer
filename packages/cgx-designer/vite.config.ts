import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { visualizer } from "rollup-plugin-visualizer";
import { terser } from "rollup-plugin-terser";
import nodeExternals from 'rollup-plugin-node-externals';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: "../",
      outDir: "dist",
      exclude: ["../**/__test__/**"],
    }),
    cssInjectedByJsPlugin(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "analz.html",
      open: false,
    }),
    terser(),
    nodeExternals()
  ],
  resolve: {
    alias: {
      "@cgx-designer/controller": path.resolve(
        __dirname,
        "../controller/index"
      ),
      "@cgx-designer/base-materials": path.resolve(
        __dirname,
        "../base-materials"
      ),
      "@cgx-designer/utils": path.resolve(__dirname, "../utils/index"),
      "@cgx-designer/hooks": path.resolve(__dirname, "../hooks/index"),
      "@cgx-designer/extensions": path.resolve(
        __dirname,
        "../extensions/index"
      ),
      "@cgx-designer/element-designer": path.resolve(
        __dirname,
        "../element-designer/index"
      ),
      "@cgx-designer/element-engine": path.resolve(
        __dirname,
        "../element-engine/index"
      ),
      "@cgx-designer/element-renderer": path.resolve(
        __dirname,
        "../element-renderer/index"
      ),
      "@cgx-designer/types": path.resolve(__dirname, "../types/index"),
    },
  },
  build: {
    outDir: "dist",
    commonjsOptions: {
      esmExternals: true,
    },
    lib: {
      name: "cgx-designer",
      formats: ["es", "cjs"],
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
        const extension = ModuleFormat === "es" ? "js" : ModuleFormat;
        if (["elementPlus", "vuetify"].includes(entryName)) {
          return `base-materials/core/${entryName}/index.${extension}`;
        }
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: ["vue", "element-plus", "vuetify"],
      output: {
        globals: {
          vue: "Vue",
        },
        preserveModules: true,
        preserveModulesRoot: "../",
      },
    },
  },
});
