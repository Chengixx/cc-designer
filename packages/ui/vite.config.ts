import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default defineConfig({
  //改一个端口
  server: {
    port: 3378,
  },
  plugins: [vue(), vueJsx()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve("./src"),
  //   },
  // },
});
