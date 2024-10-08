import { describe, it, expect } from "vitest";
import { getRandomId } from "../common";

describe("uuid测试", () => {
  it("uuid生成测试", () => {
    const length = 10;
    const uuid = getRandomId(length);
    expect(uuid.length).toBe(length);
     // 验证 UUID 是由字母和数字组成
    expect(uuid).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("uuid应该来说不能重复", () => {
    const sum = 1000;
    const uuidList = new Set();
    let times = 0;
    while (times < 1000) {
      const uuid = getRandomId();
      uuidList.add(uuid);
      times++;
    }
    //生成完之后应该长度一样
    expect(uuidList.size).toBe(sum);
  });
});
