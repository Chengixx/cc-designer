//直接在vitest中使用vue和vuejsx导致堆栈问题 不知道为什么 选择合并
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
