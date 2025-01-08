import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: "../",
      outDir: "dist",
    }),
  ],
  resolve: {
    alias: {
      "@cgx-designer/core": path.resolve(__dirname, "../core"),
      "@cgx-designer/controller": path.resolve(__dirname, "../controller"),
      "@cgx-designer/materials": path.resolve(__dirname, "../materials"),
      "@cgx-designer/utils": path.resolve(__dirname, "../utils"),
      "@cgx-designer/hooks": path.resolve(__dirname, "../hooks"),
      "@cgx-designer/extensions": path.resolve(__dirname, "../extensions"),
    },
  },
  build: {
    outDir: "dist",
    commonjsOptions: {
      esmExternals: true,
    },
    lib: {
      entry: {
        index: path.resolve(__dirname, "./index.ts"),
        elementPlus: path.resolve(__dirname, "../materials/core/elementPlus/index.ts"),
        vuetify: path.resolve(__dirname, "../materials/core/vuetify/index.ts"),
      },
      name: "cgx-designer",
      // formats: ["es"],
      fileName: (ModuleFormat, entryName) => {
        console.log("文件名",ModuleFormat, entryName);
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
