import MoveIcon from "../index.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("CCButton 组件测试", () => {
  it("应该正常触发 click 事件", async () => {
    const wrapper = mount(MoveIcon);

    await wrapper.trigger("click");

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("应该正常渲染一个插槽", () => {
    const wrapper = mount(MoveIcon, {
      slots: {
        default: () => <div>我是插槽</div>,
      },
    });
    expect(wrapper.text()).contain("我是插槽");
  });

  it("应该正常渲染label属性", () => {
    const wrapper = mount(MoveIcon, {
      props: {
        label: "我是一段文字",
      },
    });
    const tooltip = wrapper.find(".tooltip");
    expect(tooltip.text()).toBe("我是一段文字");
  });
});
