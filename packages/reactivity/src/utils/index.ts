export const isSourceData = (value: any): boolean => {
  if (
    value &&
    typeof value === "object" &&
    Object.keys(value as any).includes("type") &&
    (value as any).type === "sourceData"
  ) {
    return true;
  }

  return false;
};