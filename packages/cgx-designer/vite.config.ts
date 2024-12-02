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
      "@cgx-designer/ui": path.resolve(__dirname, "../ui"),
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
      },
      name: "cgx-designer",
      // formats: ["es"],
      fileName: (ModuleFormat, entryName) => {
        // console.log("文件name", ModuleFormat, entryName);
        const extension = ModuleFormat === "es" ? "js" : ModuleFormat;
        const path = `index.${extension}`;
        return path;
      },
    },
    rollupOptions: {
      external: ["vue", "element-plus"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
