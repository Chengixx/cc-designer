export const formatJson = (json: any) => {
  try {
    return JSON.stringify(json, null, 2);
  } catch (error) {
    return json;
  }
};
