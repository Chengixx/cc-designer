import CCButton from "../index";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("CCButton 组件测试", () => {
  it("应该正常触发 click 事件", async () => {
    const wrapper = mount(CCButton);

    await wrapper.trigger("click");

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("应该根据type属性动态更新按钮样式", () => {
    const wrapper = mount(CCButton, {
      props: {
        type: "2",
      },
    });

    const buttonClass = wrapper.classes();

    expect(buttonClass).toContain("before:bottom-0");
    expect(buttonClass).toContain("before:rounded-t-50%");
  });
});
