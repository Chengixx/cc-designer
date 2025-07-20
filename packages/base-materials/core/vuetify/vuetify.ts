export const vuetifyConfig: Record<string, any> = {
  hideDetails: true,
  variant: "outlined",
  inset: true,
  color: "primary",
  density: 'compact',
};

export const vuetifyProps = (key: string) => {
  return key !== "colorPicker" && vuetifyConfig;
};
