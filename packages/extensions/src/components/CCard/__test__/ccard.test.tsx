import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CCard from "../index";

describe("CCard", () => {
  it("应该能够正常使用头部插槽", () => {
    const wrapper = mount(CCard, {
      slots: {
        header: '<div class="header">头</div>',
      },
    });
    const header = wrapper.find(".header");
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("头");
  });

  it("应该能够正常使用默认插槽", () => {
    const wrapper = mount(CCard, {
      slots: {
        default: '<div class="default">默认</div>',
      },
    });
    const defaultSlot = wrapper.find(".default");
    expect(defaultSlot.exists()).toBe(true);
    expect(defaultSlot.text()).toBe("默认");
  });

  it("应该能够正常使用脚插槽", () => {
    const wrapper = mount(CCard, {
      slots: {
        footer: '<div class="footer">脚</div>',
      },
    });
    const footer = wrapper.find(".footer");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toBe("脚");
  });

  it("能够正常三个插槽一起渲染", () => {
    const wrapper = mount(CCard, {
      slots: {
        header: '<div class="header">头</div>',
        default: '<div class="default">中</div>',
        footer: '<div class="footer">脚</div>',
      },
    });

    expect(wrapper.find(".header").exists()).toBe(true);
    expect(wrapper.find(".header").text()).toBe("头");

    expect(wrapper.find(".default").exists()).toBe(true);
    expect(wrapper.find(".default").text()).toBe("中");

    expect(wrapper.find(".footer").exists()).toBe(true);
    expect(wrapper.find(".footer").text()).toBe("脚");
  });
});
