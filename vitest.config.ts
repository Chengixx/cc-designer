import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 设置jsdom 作为测试环境
    environment: "jsdom",
  },
});
