import { describe, it, expect } from "vitest";
import { isIElementSchemaArray } from "../common";
import { IElementSchema } from "@cgx-designer/types";

describe("isIElementSchemaArray", () => {
  it("应对包含无效元素的数组返回 false", () => {
    const invalidArrays = [
      [{ key: "key1", id: 1 }],
      [{ key: "key2", id: null }],
      [{ key: "key3", id: "str", elementList: null }],
      [{ key: "key4", id: "str", elementList: [{}] }],
      [
        {
          key: "key5",
          id: "str",
          elementList: [{ key: "key6", id: "str", elementList: 123 }],
        },
      ],
    ];

    invalidArrays.forEach((arr) => {
      expect(isIElementSchemaArray(arr)).toBe(false);
    });
  });

  it("应对有效的 IElementSchema 数组返回 true", () => {
    const validArray: IElementSchema[] = [
      { key: "key1", id: "str", elementList: [], props: {} },
      {
        key: "key2",
        id: "str",
        elementList: [{ key: "key3", id: "str", props: {} }],
        props: {},
      },
      {
        key: "key4",
        id: "str",
        elementList: [{ key: "key5", id: "str", elementList: [], props: {} }],
        props: {},
      },
    ];

    expect(isIElementSchemaArray(validArray)).toBe(true);
  });

  it("应处理空数组", () => {
    expect(isIElementSchemaArray([])).toBe(true);
  });
});
