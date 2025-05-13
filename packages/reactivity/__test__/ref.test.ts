import { describe, it, expect, beforeEach, vi } from "vitest";
import { Ref, ref } from "../index";

describe("Ref 类", () => {
  let refInstance;

  beforeEach(() => {
    // 在每个测试之前初始化一个 Ref 实例
    refInstance = new Ref(1);
  });

  it("应该使用初始值创建实例", () => {
    expect(refInstance.value).toBe(1);
  });

  it("应该更新值", () => {
    refInstance.value = 2;
    expect(refInstance.value).toBe(2);
  });
});

describe("ref 函数", () => {
  it("应该创建带初始值的 Ref 实例", () => {
    const r = ref(10);
    expect(r.value).toBe(10);
  });
});
