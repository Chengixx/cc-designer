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

  it("应该添加依赖并在值更改时调用它", () => {
    const mockFn = vi.fn();
    refInstance.addDeps(mockFn);

    refInstance.value = 3;
    expect(mockFn).toHaveBeenCalled();
  });

  it("应该移除依赖", () => {
    const mockFn = vi.fn();
    refInstance.addDeps(mockFn);
    refInstance.removeDeps(mockFn);

    refInstance.value = 4;
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("应该清除所有依赖", () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    refInstance.addDeps(mockFn1);
    refInstance.addDeps(mockFn2);

    refInstance.clearDeps();
    refInstance.value = 5;
    expect(mockFn1).not.toHaveBeenCalled();
    expect(mockFn2).not.toHaveBeenCalled();
  });

  it("应该获取所有依赖", () => {
    const mockFn = () => {};
    refInstance.addDeps(mockFn);

    expect(refInstance.getDeps().size).toBe(1);
  });
});

describe("ref 函数", () => {
  it("应该创建带初始值的 Ref 实例", () => {
    const r = ref(10);
    expect(r.value).toBe(10);
  });
});
