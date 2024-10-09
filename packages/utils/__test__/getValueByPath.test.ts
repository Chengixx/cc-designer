import { describe, expect, it } from "vitest";
import { getValueByPath } from "../common";

describe("测试一下根据路径获取对象的值", () => {
  //这个拿来当用例
  const data = {
    man: {
      name: "科比",
      age: 18,
      wife: {
        name: "cxk",
        age: 11,
      },
      jj: ["1", "cm"],
    },
  };

  it("正常情况正常获取", () => {
    expect(getValueByPath(data, "man.name")).toBe("科比");
    expect(getValueByPath(data, "man.wife.name")).toBe("cxk");
    expect(getValueByPath(data, "man.wife.age")).toBe(11);
  });

  it("路径不存在,不传回undifined 不然会默认值", () => {
    expect(getValueByPath(data, "man.wife.name1")).toBe(undefined);
    expect(getValueByPath(data, "man.wife.age1")).toBe(undefined);
    expect(getValueByPath(data, "man.wife.age1.name", "科比啊")).toBe("科比啊");
  });

  it("数组应该可以", () => {
    expect(getValueByPath(data, "man.jj.0")).toBe("1");
  });
});
