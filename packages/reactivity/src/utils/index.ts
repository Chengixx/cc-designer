import { IEditorElement } from "@cgx-designer/types";

export const isValueIsSourceData = (value: any): boolean =>
  value &&
  typeof value === "object" &&
  Object.keys(value as any).includes("type") &&
  (value as any).type === "sourceData";

export const isAttrIsSourceData = (
  attrName: string,
  elementSchema: IEditorElement
): boolean => {
  //首先 要先看一下attrName
  if (attrName.startsWith("props")) {
    return isValueIsSourceData(elementSchema.props![attrName.slice(6)]);
  } else {
    return isValueIsSourceData(elementSchema[attrName]);
  }
};
