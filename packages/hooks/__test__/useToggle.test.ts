import { describe, it, expect } from "vitest";
import { useToggle } from "../src/useToggle";

describe("useToggle 钩子", () => {
  it("应该初始化为 false", () => {
    const [state] = useToggle();
    expect(state.value).toBe(false);
  });

  it("应该切换状态", () => {
    const [state, toggle] = useToggle(true);
    toggle();
    expect(state.value).toBe(false);

    toggle();
    expect(state.value).toBe(true);
  });

  it("应该设置指定的值", () => {
    const [state, toggle] = useToggle(true);
    toggle(false);
    expect(state.value).toBe(false);

    toggle(true);
    expect(state.value).toBe(true);
  });
});
