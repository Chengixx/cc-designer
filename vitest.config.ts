import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const vitestConfig = defineConfig({
  test: {
    // 设置jsdom 作为测试环境
    environment: "jsdom",
  },
});

export default mergeConfig(viteConfig, vitestConfig);
